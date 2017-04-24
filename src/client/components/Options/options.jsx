import React, { Component } from 'react';
import { connect } from 'react-redux';
import { DropdownButton, MenuItem } from 'react-bootstrap';

class Options extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <div style={{ display: "flex", flexFlow: "row wrap", marginLeft: "10px" }}>
        <DropdownButton id="Default" title="Options" className="options">
          {!this.props.authenticated && <MenuItem href="/#/auth/signin">Sign In</MenuItem>}
          {!this.props.authenticated && <MenuItem href="/#/auth/signup">Sign Up</MenuItem>}
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