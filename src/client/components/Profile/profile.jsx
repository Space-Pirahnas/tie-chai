import React from 'react';
import { connect } from 'react-redux'
import * as actions from '../../actions/index.jsx';

class Profile extends React.Component {
  constructor(props) {
    super(props);

  }

  render () {
    console.log('props.userInfo: ', this.props.userInfo);
    return (
      <div>
        <div id="hero" className="Hero" style={{ backgroundImage: "url(styles/coffeebackground.jpg)" }}>
          <div className="container">
            <img className="profileImage" src={this.props.getUserInfo.Profile.image} />
            <div className="Interests">
              <h2>Interests</h2>
              {this.props.getUserInfo.Profile.interests.map((interest) => 
                <div className="interest Button">{interest}</div>
              )}
            </div>
            <div id="clear"></div>
            <div style={{"margin-left": "50px"}}>
            <div>
              <p>{this.props.getUserInfo.Profile.name} in {this.props.getUserInfo.Profile.city}</p>
              <p>{this.props.getUserInfo.Profile.email}</p>
            </div>
            <div className="button-wrapper" style={{width: "20%"}}>
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
  return { userInfo: state.userInfo }
}

export default connect(mapStateToProps, actions)(Profile);