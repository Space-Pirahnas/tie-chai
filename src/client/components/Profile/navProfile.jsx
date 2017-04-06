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
      </a>
    );
  }
};

export default navProfile;
