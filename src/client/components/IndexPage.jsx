import React, { Component } from 'react';
import { Link } from 'react-router';
import Parallax from 'react-simple-parallax';
class IndexPage extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    const HeroButton = () => (
      <a href="/#/auth/signup" className="Button">Sign Up</a>
    )
    const section = {
      textAlign: 'center'
    }
    const background = {
      height: "1000px",
      width: "100%",
      backgroundImage: 'url(styles/coffee-meeting.jpg)',
      margin: '0, auto',
    }
    const box = {
      top: "300px",
      background: 'rgba(0,0,0,0.2)',
      margin: 'auto',
      color: '#fff',
      fontSize: '40px',
      boxShadow: '10px 7px 5px 1px rgba(0,0,0,0.45)',
      maxWidth: '80%'
    }
    return (
      <div>
        <section>
          <Parallax className="parallax" speedDivider="2">
          </Parallax>
        </section>
        <section style={section}>
          <Parallax style={box} speedDivider="5" backgroundStyle={background}>
            <div className="appInfo">
              <img className="steam" src={"styles/steam.png"} />
              <img className="indexLogo" src={"styles/tiechailogo.png"} />
              <div>
                <img style={{ "maxWidth": "80px", display: "inline-block" }} className="linkedin" src={"styles/linkedin.svg"} />
                <span style={{ margin: "10px" }} >meets</span>
                <img style={{ "maxWidth": "50px", display: "inline-block" }} className="tinder" src={"styles/tinder.svg"} />
              </div>
              <div className="appBio"> Social media platform for professionals with mutual interest in expanding their network. Users can broadcast and share events that only people in their network can see. Meetings can be arranged between users.</div>
              <a href="/#/auth/signup" className="signupButton">Sign Up</a>
            </div>
          </Parallax>
        </section>
      </div>
    );
  }
};
export default IndexPage;