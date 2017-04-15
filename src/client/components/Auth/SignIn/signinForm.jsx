import React from 'react';
import { Field, reduxForm } from 'redux-form';
import { signupFields } from '../form-fields.jsx';

const { renderTextField } = signupFields;

class SignInForm extends React.Component {
  constructor(props) {
    super(props);


  }
  render() {
    const { handleSubmit, pristine, reset, submitting } = this.props;
    return (
      <form className="signinForm" onSubmit={ handleSubmit }>
        <div>
          <Field name="email" type="email" component={ renderTextField } label="Email" />
          <Field name="password" type="password" component={ renderTextField } label="Password"/>
        </div>
        <div style={{ margin: "20px" }}>
          <button type="submit" className="Button" disabled={pristine || submitting}>Sign In</button>
        </div>
      </form>
    )
  }
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