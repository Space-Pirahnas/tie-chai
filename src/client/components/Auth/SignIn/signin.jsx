import React from 'react';
import axios from 'axios';

import SignInForm from './signinForm.jsx';

class SignIn extends React.Component {
  constructor(props) {
    super(props);
    this.handleFormSubmit = this.handleFormSubmit.bind(this);
  }

  handleFormSubmit(values) {
    console.log("get the values ", values);
    axios.post('/api/login', {
      Email: values.email,
      Password: values.password
    })
    .then(token => {
      console.log('Sign In successfully, token is ', token);
    })
    .catch(error => {
      console.log('Fail to sign in, error is ', error);
    })
    
  }

  render() {
    return (
      <div>
        <h1>Sign In Page From SignIn.jsx</h1>
        <SignInForm onSubmit={this.handleFormSubmit} />
      </div>
    );
  }
};


export default SignIn;