import React, { Component } from 'react';
import { connect } from 'react-redux'
import * as actions from '../../../actions/reviews.jsx';
import SubmitReview from './submit_review.jsx';

class Review extends Component {
  constructor(props) {
    super(props);
    this.state = {
      update: false
    }
    this.deleteReview = this.deleteReview.bind(this);
    this.toggleUpdate = this.toggleUpdate.bind(this);
  }

  deleteReview() {
    this.props.deleteReview(this.props.user.Email, this.props.target.Email, this.props.review.Reviewer_Rating, this.props.review.Reviewer_Text);
  }

  toggleUpdate(){
    this.setState({
      update: !this.state.update
    });
  }

  render() {
    const image = this.props.review.Reviewer_Image || "./styles/noprofile.png";
    return (
      <div>
        <div className="home_match profile_review">
          <div><img src={image} className="home_image" /></div>
          <div className="profile_review_text">
            <div>{this.props.review.Reviewer_Name} - {this.props.review.Reviewer_Rating} <span><img src="./styles/star.svg" className="profile_review_star"/></span></div>
            <div>{this.props.review.Reviewer_Text}</div>
            {this.props.user.Email === this.props.review.Reviewer_Email ? !this.state.update ? <i onClick={this.deleteReview} className="fa fa-trash-o fa-lg" style={{color: "red"}}></i>: null: null}
            {this.props.user.Email === this.props.review.Reviewer_Email ? <i onClick={this.toggleUpdate} className="fa fa-pencil-square-o fa-lg" style={{color: "blue"}}/>: null}
            {this.state.update ? <SubmitReview value={this.props.review.Reviewer_Text} rating={this.props.review.Reviewer_Rating} type={"update"} toggleUpdate={this.toggleUpdate} />  : null}
          </div>
        </div>
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

export default connect(mapStateToProps, actions)(Review);