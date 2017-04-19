import React from 'react';
import { connect } from 'react-redux';
import * as actions from '../../../actions/index.jsx';
import SignInForm from './signinForm.jsx';

class SignIn extends React.Component {
  constructor(props) {
    super(props);
    this.handleFormSubmit = this.handleFormSubmit.bind(this);
  }

  handleFormSubmit({email, password}) {
    this.props.signinUser({email, password});  
  }

  render() {
    return (
     <div className="background" style={{backgroundImage: "url(styles/tweed.png)"}}>
        <div className="signupContainer" style={{backgroundImage: "url(styles/creampaper.png)"}}>
          <h2>SIGN IN</h2>
          <SignInForm onSubmit={this.handleFormSubmit} />
          {this.props.error ? <div style={{ marginTop: "2%", color: "red" }}>ERROR: Invalid Email/Password combination. Please try again.</div> : null}
        </div>
      </div>
    )
  }
}

function mapStateToProps(state) {
  return { error: state.auth.error };
}

export default connect(mapStateToProps, actions)(SignIn);