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
      <div id="hero" className="Hero" style={{backgroundImage: "url(styles/coffeebackground.jpg)" }}>
        <div className="content">
          <img className="logo" src={"styles/mug.png"} />
          <div>
            <img style={{ "maxWidth": "80px", display: "inline-block" }} className="linkedin" src={"styles/linkedin.svg"} />
            <span style={{ margin: "10px" }} >meets</span>
            <img style={{ "maxWidth": "50px", display: "inline-block" }} className="tinder" src={"styles/tinder.svg"} />
            <p> Social media platform for professionals with mutual interest in expanding their network. Users can broadcast and share events that only people in their network can see. Meetings can be arranged between users.</p>
          </div>
          <div className="button-wrapper">
            <HeroButton />
          </div>
        </div>
        <div className="overlay"></div>
      </div>
    );
  }
};

export default IndexPage;
//export a 
//use to export specific properties not the Class