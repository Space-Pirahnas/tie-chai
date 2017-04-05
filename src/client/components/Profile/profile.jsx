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
          <div className="image"><img src={"styles/user.jpg"} /></div>
        </div>
      </div>
    );
  }
};


export default Profile;