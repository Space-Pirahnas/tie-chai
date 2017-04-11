import React from 'react';
import { connect } from 'react-redux'
import * as actions from '../../actions/index.jsx';
import UploadImage from './upload_image.jsx';

class Profile extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      edit: false
    }
    this.toggleEdit = this.toggleEdit.bind(this);
  }

  toggleEdit() {
    this.setState({
      edit: !this.state.edit
    });
  }

  render() {
    const { Email, Image } = this.props.userInfo;
    const ProfilePic = () => (
      <div>
        <img className="profileImage" src={`http:${Image.slice(5)}`} />
      </div>
    )
    let interests = this.props.userInfo.Interests.split('-');
    return (
      <div>
        <div id="hero" className="Hero" style={{ backgroundImage: "url(styles/coffeebackground.jpg)" }}>
          <div className="container">
            {
              !this.state.edit ? this.props.userInfo ? <ProfilePic /> : null : null
            }
            {this.state.edit ? <div><UploadImage /></div> : null }
            <div className="Interests">
              <h2>Interests</h2>
              { interests.map((interest,i) => <div className="interest Button" key={i}>{interest}</div>)}
            </div>
            <div id="clear"></div>
            <div style={{ "marginLeft": "50px" }}>
              <div>
                {this.state.edit ? <button className="Button" onClick={this.toggleEdit}>Cancel</button> : <button className="Button" onClick={this.toggleEdit}>Edit Profile Image!</button> }
                <p>{this.props.userInfo.Name} in {this.props.userInfo.City}</p>
                <p>{this.props.userInfo.Email}</p>
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
  }
};

function mapStateToProps(state) {
  console.log('state in profile: ', state);
  return { userInfo: state.userInfo.user }
}

export default connect(mapStateToProps, actions)(Profile);