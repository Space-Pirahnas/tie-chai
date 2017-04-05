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
      <div>
        <div id="hero" className="Hero" style={{ backgroundImage: "url(styles/coffeebackground.jpg)" }}>
          <div className="content">
            <img className="logo" src={"styles/mug.png"} />
            <h2>Tie-Chai</h2>
            <p>Linkedin meets tinder</p>
            <div className="button-wrapper">
              <HeroButton />
            </div>
          </div>
          <div className="overlay"></div>
        </div>
      </div>
    );
  }
};

export default IndexPage;
//export a 
//use to export specific properties not the Class