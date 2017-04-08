import React from 'react';
import { DropdownButton, MenuItem } from 'react-bootstrap';

class Options extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div>
        <DropdownButton style={{"background": "transparent", "color": "white", "margin-left": "30px"}} title="Options" className="options">
          <MenuItem href="/#/auth/signin">Sign In</MenuItem>
          <MenuItem href="/#/auth/signout">Sign Out</MenuItem>
        </DropdownButton>
      </div>
    );
  }
};

export default Options;
