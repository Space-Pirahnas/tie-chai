import React, { Component } from 'react';
import { Link } from 'react-router';

class IndexPage extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div>
        <nav className="navbar navbar-light navbar-fixed-top">
          <div className="container-fluid">
            <div id="navbar" className="navbar-collapse collapse">
              <ul className="nav navbar-nav navbar-right">
                <li><Link to="/auth/signin">Sign In</Link></li>
                <li><Link to="/auth/signup">Sign Up</Link></li>
              </ul>
            </div>
          </div>
        </nav>
        <img style={{"max-width": "100%"}}src={"styles/veer.jpg"} />
      </div>
    );
  }
};

export default IndexPage;
//export a 
//use to export specific properties not the Class