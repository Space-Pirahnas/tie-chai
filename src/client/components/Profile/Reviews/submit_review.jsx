import React, { Component } from 'react';
import { connect } from 'react-redux'
import * as actions from '../../../actions/reviews.jsx';
import TextField from 'material-ui/TextField';

class SubmitReview extends Component {
  constructor(props) {
    super(props);
    this.state = {
      value: this.props.value,
      rating: this.props.rating,
      initial : {
        value : this.props.value,
        rating: this.props.rating
      }
    }
    this.handleSubmit = this.handleSubmit.bind(this);
    this.changeRating = this.changeRating.bind(this);
    this.changeValue = this.changeValue.bind(this);
  }

  handleSubmit(e) {
    e.preventDefault();
    if (this.props.type === "add") {
      this.props.submitReview(this.props.user.Email, this.props.target.Email, +this.state.rating, this.state.value);
      this.setState({
        value: "",
        rating: 0
      });
    } else if (this.props.type === "update") {
      let oldReview = {
        Email: this.props.target.Email,
        Reviewer_Email : this.props.user.Email,
        Text: this.state.initial.value,
        Rating: this.state.initial.rating
      }

      let newReview = {
        Email: this.props.target.Email,
        Reviewer_Email : this.props.user.Email,
        Text: this.state.value,
        Rating: +this.state.rating
      }

      this.props.updateReview(oldReview, newReview);
      this.props.toggleUpdate();
    }
    this.props.toggleReview();
  }

  changeRating(rating) {
    this.setState({
      rating: rating.target.value
    });
  }

  changeValue(text) {
    this.setState({
      value: text.target.value
    });
  }

  render() {
    return (
      <div className="profile_submit_review">
        <form onSubmit={this.handleSubmit}>
          <TextField onChange={this.changeValue} hintText="Review Text" />
          <select value={this.state.rating} onChange={this.changeRating}>
            <option disabled={true} value="0">Rating!</option>
            <option value="1">1</option>
            <option value="2">2</option>
            <option value="3">3</option>
            <option value="4">4</option>
            <option value="5">5</option>
          </select>
          <button onClick={this.handleSubmit}>Submit</button>
        </form>
      </div>
    )
  }
}

function mapStateToProps(state) {
  console.log(state, "state here");
  return {
    user: state.userInfo.user,
    target: state.target.User
  }
}

export default connect(mapStateToProps, actions)(SubmitReview);


