import React from 'react';

class navProfile extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <a href="/#/profile/:userid" className="UserProfile">
        <div className="User">
          <div className="name">Veer Gangwal</div>
          <div className="image"><img src={"styles/user.jpeg"} /></div>
        </div>
        <div className="button-wrapper">
          <a href="/#/auth/signin" className="Button">Sign In</a>
        </div>
        <div className="button-wrapper">
          <a href="/#" className="Button">Sign Out</a>
        </div>
      </a>
    );
  }
};


export default navProfile;