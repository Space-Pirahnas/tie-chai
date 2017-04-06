import React from 'react';
import { DropdownButton, MenuItem } from 'react-bootstrap';

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
        <DropdownButton title="Options">
          <MenuItem href="/#/auth/signin">Sign In</MenuItem>
          <MenuItem href="/#">Sign Out</MenuItem>
        </DropdownButton>
      </a>
    );
  }
};

export default navProfile;
