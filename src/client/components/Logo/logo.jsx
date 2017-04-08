import React from 'react';
import { connect } from 'react-redux';
// Logo
const Logo = (props) => {
  console.log("in the logo.jsx props", props);
  return (
    <a href={props.authenticated ? '/#/home' : '/'} id="logo" className="Logo">
      <img style={{ "max-width": "100%", position: "relative" }} src={"styles/navLogo.png"} />
    </a>
  );
};

function mapStateToProps(state) {
  return { authenticated: state.auth.authenticated };
}
export default connect(mapStateToProps)(Logo);