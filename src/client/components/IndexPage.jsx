import React, { Component } from 'react';
import { Link } from 'react-router';

class IndexPage extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div>
        <div id="hero" className="Hero" style={{backgroundImage: "url(styles/coffeebackground.jpg)"}}>
          <div className="content">
            <img id="logo" className="Logo" src={"styles/mug.png"} />
            <h2>Tie-Chai</h2>
            <p>Linkedin meets tinder</p>
            <div className="button-wrapper">
              <Link className="Button" to="/auth/signin">Sign In</Link>
              <Link className="Button" to="/auth/signup">Sign Up</Link>
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