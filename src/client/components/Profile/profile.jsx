import React from 'react';
import { connect } from 'react-redux'
import * as actions from '../../actions/matches.jsx';
import UploadImage from './upload_image.jsx';
import Review from './Reviews/reviews.jsx';
import SubmitReview from './Reviews/submit_review.jsx';

class Profile extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      edit: false,
      review: false
    }
    this.toggleEdit = this.toggleEdit.bind(this);
    this.toggleReview = this.toggleReview.bind(this);
    this.props.getTarget(this.props.params.userEmail);
  }

  toggleEdit() {
    this.setState({
      edit: !this.state.edit
    });
  }

  toggleReview() {
    this.setState({
      review: !this.state.review
    });
  }

  render() {
    if (this.props.target) {
      const { Email, Image } = this.props.target;
      const ProfilePic = () => (
        <div>
          <img className="profileImage" src={Image} />
        </div>
      )
      return (
        <div>
          <div id="hero" className="Hero" style={{ backgroundImage: "url(styles/coffeebackground.jpg)" }}>
            <div className="container">
              {
                !this.state.edit ? this.props.target.Image ? <ProfilePic /> : <img className="profileImage" src={"./styles/noprofile.png"} /> : null
              }
              {this.state.edit && this.props.target.Email === this.props.user.Email ? <div className="profileImage"><UploadImage toggleEdit={this.toggleEdit} /></div> : null }
              <div className="Interests">
                <h2>Interests</h2>
                { this.props.target ? this.props.target.Interests.split('-').map((interest,i) => <div className="interest Button" key={i}>{interest}</div>) : null}
                <h2>Reviews</h2>
                {this.props.user.Email !== this.props.target.Email ? <center>{!this.state.review ? <button className="Button" onClick={this.toggleReview} >Write A Review!</button> : <button className="Button" onClick={this.toggleReview} >Cancel!</button>}</center> : null }
                {this.state.review ? <SubmitReview type={"add"} rating={0} value={""} /> : null }
                <div className="reviews">
                  {this.props.target.Reviews ? this.props.target.Reviews.slice().reverse().map((review, i) => <Review key={i} review={review} />) : null}
                </div>
              </div>
              <div id="clear"></div>
              <div style={{ "marginLeft": "50px" }}>
                <div>
                  {!this.state.edit  ? this.props.user.Email === this.props.target.Email ? <button className="Button" onClick={this.toggleEdit}>Edit Profile Picture</button> : null : <button className="Button" onClick={this.toggleEdit}>Cancel</button> }
                  <p>{this.props.target.Name} in {this.props.target.City}</p>
                  <p>{this.props.target.Email}</p>
                  <p>{this.props.target.Rating_Average.toFixed(1)} Star Average Rating!</p>
                </div>
                <div className="button-wrapper" style={{ width: "20%" }}>
                  <a href="/#/message" className="Button">Message</a>
                </div>
              </div>
            </div>
            <div className="overlay"></div>
          </div>
        </div>
      );
    } else {
      return <div>Loading.....</div>
    }
  }
};

function mapStateToProps(state) {
  return { target: state.target.user, user: state.userInfo.user }
}

export default connect(mapStateToProps, actions)(Profile);