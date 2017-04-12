import React, { Component } from 'react';
import { connect } from 'react-redux'
import * as actions from '../../../actions/reviews.jsx';

class SubmitReview extends Component {
  constructor(props) {
    super(props);
    this.state = {
      value: "",
      rating: 0
    }
    this.handleSubmit = this.handleSubmit.bind(this);
    this.changeRating = this.changeRating.bind(this);
    this.changeValue = this.changeValue.bind(this);
  }

  handleSubmit() {
    this.props.submitReview(this.props.user.Email, this.props.target.Email, +this.state.rating, this.state.value);
    this.setState({
      value: "",
      rating: 0
    });
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
      <div>
        <input type="text" value={this.state.value} onChange={this.changeValue} placeholder="Review Text" />
        <select value={this.state.rating} onChange={this.changeRating}>
          <option disabled={true} >Rating!</option>
          <option value="1">1</option>
          <option value="2">2</option>
          <option value="3">3</option>
          <option value="4">4</option>
          <option value="5">5</option>
        </select>
        <button onClick={this.handleSubmit}>Submit</button>
      </div>
    )
  }
}

function mapStateToProps(state) {
  return {
    user: state.userInfo.user,
    target: state.target.user
  }
}

export default connect(mapStateToProps, actions)(SubmitReview);


