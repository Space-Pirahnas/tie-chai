import React from 'react';
import { connect } from 'react-redux'
import { reduxForm, Field } from 'redux-form';
import Survey from './survey.jsx';


class SignUp extends React.Component {
  constructor(props) {
    super(props);
    console.log('In the signup.jsx contructor')
  }

  handleFormSubmit(values) {
    console.log("the form value from surveydd ", values);
  }

  render() {
    return (
      <div>
        <h1>Sign Up Page From SignUp.jsx</h1>
        <Survey onSubmit={this.handleFormSubmit} />
      </div>
    );
  }
};


export default SignUp;