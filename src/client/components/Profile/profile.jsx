import React from 'react';
import { connect } from 'react-redux'
import * as actions from '../../actions/matches.jsx';
import UploadImage from './upload_image.jsx';
import Review from './Reviews/reviews.jsx';
import SubmitReview from './Reviews/submit_review.jsx';
import { Rating } from 'material-ui-rating';


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
        <div className="background" style={{backgroundImage: "url(styles/retina_wood.png)"}}>
          <div className="ProfileContainer">
            <div className="Profile" style={{backgroundImage: "url(styles/creampaper.png)"}}>
              <div className="ProfilePicture">
                {
                  !this.state.edit ? this.props.target.Image ? <ProfilePic /> : <img className="profileImage" src={"./styles/noprofile.png"} /> : null
                }
                {this.state.edit && this.props.target.Email === this.props.user.Email ? <div className="profileImage"><UploadImage /></div> : null }
              </div>
              <div className="ProfileInfo">
                {!this.state.edit  ? this.props.user.Email === this.props.target.Email ? <button className="Button" onClick={this.toggleEdit}>Edit Profile Picture</button> : null : <button className="Button" onClick={this.toggleEdit}>Cancel</button> }
                <div className="ProfileRating">
                  <Rating value={this.props.target.Rating_Average} max={5} readOnly={true} />
                </div>
                <div className="ProfileName">{this.props.target.Name}</div>
                <div className="ProfileContactInfo">
                  {this.props.target.Profession} @ {this.props.target.Company}  -  {this.props.target.City}  -  {this.props.target.Email}
                </div>
                <h2>Interests</h2>
                <div className="ProfileInterests">
                  { this.props.target ? this.props.target.Interests.split('-').map((interest,i) => <div className="interest Button" key={i}>{interest}</div>) : null}
                </div>
                <div className="ProfileBio">{this.props.target.Bio}</div>
                <a href="/#/message" className="Button">Message</a>
              </div>
            </div>         
            <div className="ProfileReview">
              <h2 style={{"margin-top": "50px"}} >Reviews</h2>
              <center><button className="Button" onClick={this.toggleReview} >Write A Review!</button></center>
              {this.state.review ? <SubmitReview  /> : null }
              <div className="Reviews">
                {this.props.target.Reviews ? this.props.target.Reviews.map((review, i) => <Review key={i} index={i} review={review} />) : null}
              </div>
            </div>
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

{/*{this.props.target.Reviews ? this.props.target.Reviews.map((review, i) => <Review key={i} review={review} />) : null}*/}

export default connect(mapStateToProps, actions)(Profile);