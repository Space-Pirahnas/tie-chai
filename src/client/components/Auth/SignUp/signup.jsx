import React from 'react';
import { connect } from 'react-redux'
import { reduxForm, Field } from 'redux-form';
import Survey from './survey.jsx';


class SignUp extends React.Component {
  constructor(props) {
    super(props);
  }

  handleFormSubmit(values) {
    const signupObj = {
      Name: values.name,
      Email: values.email,
      Password: values.password,
      City: values.city,
      Interests: values.interest.split(',')
    }
    console.log("the form value from survey OBJ send to server ", signupObj);
    
    // once user click submit button
      // axios sent to server to register this user
      // request token sent to home page
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