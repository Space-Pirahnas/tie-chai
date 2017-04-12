import React from 'react';
import { connect } from 'react-redux'
import * as actions from '../../actions/matches.jsx';
import UploadImage from './upload_image.jsx';

class Profile extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      edit: false
    }
    this.toggleEdit = this.toggleEdit.bind(this);
  }

  componentWillMount(){
    this.props.getTarget(this.props.params.userEmail);
  }

  componentWillUpdate(){
    this.props.getTarget(this.props.params.userEmail);
  }

  toggleEdit() {
    this.setState({
      edit: !this.state.edit
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
              {this.state.edit ? <div className="profileImage"><UploadImage /></div> : null }
              <div className="Interests">
                <h2>Interests</h2>
                { this.props.target ? this.props.target.Interests.split('-').map((interest,i) => <div className="interest Button" key={i}>{interest}</div>) : null}
              </div>
              <div id="clear"></div>
              <div style={{ "marginLeft": "50px" }}>
                <div>
                  {this.state.edit ? <button className="Button" onClick={this.toggleEdit}>Cancel</button> : <button className="Button" onClick={this.toggleEdit}>Edit Profile Image!</button> }
                  <p>{this.props.target.Name} in {this.props.target.City}</p>
                  <p>{this.props.target.Email}</p>
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
  return { target: state.target.user }
}

export default connect(mapStateToProps, actions)(Profile);