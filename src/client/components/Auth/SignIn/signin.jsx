import React from 'react';
import axios from 'axios';
import { connect } from 'react-redux';
import * as actions from '../../../actions/index.jsx';
import SignInForm from './signinForm.jsx';

class SignIn extends React.Component {
  constructor(props) {
    super(props);
    this.handleFormSubmit = this.handleFormSubmit.bind(this);
  }

  handleFormSubmit({email, password}) {
    console.log("get the values ", email, password);
    this.props.signinUser({email, password});  
  }

  render() {
    return (
      <div style={{"margin-top": "30%"}}>
        <h1>Sign In Page From SignIn.jsx</h1>
        <SignInForm onSubmit={this.handleFormSubmit} />
      </div>
    );
  }
};

function mapStateToProps(state) {
  return { errorMessage: state.auth.error };
}

export default connect(mapStateToProps, actions)(SignIn);