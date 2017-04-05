import React from 'react';
import { Field, reduxForm } from 'redux-form';
import { signinField } from '../form-fields.jsx';


const { emailField, passwordField } = signinField;

const SignInForm = (props) => {
  const { handleSubmit, pristine, reset, submitting } = props;
  return (
    <form onSubmit={handleSubmit}>
      <Field name='email' type="email" component={emailField} placeholder="Email" require />
      <Field name='password' type='password' component={passwordField} placeholder="******" require />
      <div>
        <button type="submit" disabled={pristine || submitting}>Sign In</button>
      </div>
    </form>
  )
}

const validate = (values) => {
  const errors = {};

  if (!values.email) {
    errors.email = 'Please enter an email';
  }

  if (!values.password) {
    errors.password = 'Please enter a password';
  }

  return errors;
}

export default reduxForm({
  form: 'signin',
  validate
})(SignInForm)