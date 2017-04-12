import React, { Component } from 'react';
import { connect } from 'react-redux'
import * as actions from '../../../actions/reviews.jsx';

class Review extends Component {
  constructor(props) {
    super(props);
    this.deleteReview = this.deleteReview.bind(this);
  }

  deleteReview() {
    this.props.deleteReview(this.props.user.Email, this.props.target.Email, this.props.review.Reviewer_Rating, this.props.review.Reviewer_Text);
  }

  render() {
    return (
      <div>
        <div>{this.props.review.Reviewer_Rating}</div>
        <div>{this.props.review.Reviewer_Name}</div>
        <div>{this.props.review.Reviewer_Text}</div>
        <div>{this.props.review.Reviewer_City}</div>
        <div>{this.props.review.Reviewer_Image}</div>
        {this.props.user.Email === this.props.review.Reviewer_Email ? <button onClick={this.deleteReview}>Delete</button>: null}
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