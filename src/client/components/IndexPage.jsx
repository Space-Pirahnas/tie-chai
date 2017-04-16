import React, { Component } from 'react';
import { Link } from 'react-router';

class IndexPage extends Component {
  constructor(props) {
    super(props);
  }


  render() {
    
    const HeroButton = () => (
      <a href="/#/auth/signup" className="Button">Sign Up</a>
    )

    return (
      <div className="background" style={{backgroundImage: "url(styles/white_leather.png)" }}>
        <div className="indexBody">
          <div className="appInfo">
            <img className="steam" src={"styles/steam.png"} />
            <img className="indexLogo" src={"styles/tiechailogo.png"} />
            <div>
              <img style={{ "maxWidth": "80px", display: "inline-block" }} className="linkedin" src={"styles/linkedin.svg"} />
              <span style={{ margin: "10px" }} >meets</span>
              <img style={{ "maxWidth": "50px", display: "inline-block" }} className="tinder" src={"styles/tinder.svg"} />
            </div>
            <div className="appBio"> Social media platform for professionals with mutual interest in expanding their network. Users can broadcast and share events that only people in their network can see. Meetings can be arranged between users.</div>
            <a href="/#/auth/signup" className="Button">Sign Up</a>
          </div>
          <div className="appStats">
          </div>
        </div>    
      </div>
    );
  }
};

export default IndexPage;
//export a 
//use to export specific properties not the Class