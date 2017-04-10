import React from 'react';
import { connect } from 'react-redux'
import * as actions from '../../actions/index.jsx';

class Profile extends React.Component {
  constructor(props) {
    super(props);

  }

  render() {
    const { Email, Image } = this.props.userInfo;
    const ProfilePic = () => (
      <div>
        <img className="profileImage" src={Image} />
      </div>
    )
    let interests = (this.props.userInfo.Interests).slice(1, this.props.userInfo.Interests.length).split(',');
    return (
      <div>
        <div id="hero" className="Hero" style={{ backgroundImage: "url(styles/coffeebackground.jpg)" }}>
          <div className="container">
            {
              this.props.userInfo.Image ? <ProfilePic /> : <img className="profileImage" src={"styles/user.jpeg"} />
            }
            <div className="Interests">
              <h2>Interests</h2>
              { interests.map((interest) =>
                <div className="interest Button" key={Email}>{interest}</div>
              )}
            </div>
            <div id="clear"></div>
            <div style={{ "marginLeft": "50px" }}>
              <div>
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