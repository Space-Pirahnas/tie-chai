import React from 'react';
import { connect } from 'react-redux';
import { DropdownButton, MenuItem } from 'react-bootstrap';

class Options extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div>
        <DropdownButton id="Default" style={{"background": "transparent", "color": "white", "marginLeft": "30px"}} title="Options" className="options">
          {!this.props.authenticated && <MenuItem href="/#/auth/signin">Sign In</MenuItem>}
          {this.props.authenticated && <MenuItem href="/#/auth/signout">Sign Out</MenuItem>}
        </DropdownButton>
      </div>
    );
  }
};

function mapStateToProps(state) {
  return { authenticated: state.auth.authenticated };
}

export default connect(mapStateToProps)(Options);
