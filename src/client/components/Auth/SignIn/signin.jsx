import React from 'react';
import SignInForm from './signinForm.jsx';

class SignIn extends React.Component {
  constructor(props) {
    super(props);
    this.handleFormSubmit = this.handleFormSubmit.bind(this);
  }

  handleFormSubmit(values) {
    console.log("get the values ", values);
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