import React from 'react';

class Profile extends React.Component {
  constructor(props) {
    super(props);
  }

  render () {
    return (
      <div className="UserProfile">
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
      </div>
    );
  }
};


export default Profile;