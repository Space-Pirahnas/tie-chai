import React from 'react';
import { connect } from 'react-redux'
import { reduxForm, Field } from 'redux-form';
import { signupFields } from '../form-fields.jsx';
import validate from './validate.jsx';

const { emailField, nameField, passwordField, passwordConfirmField } = signupFields;

class SurveyFirstPage extends React.Component {
  render() {
    const { handleSubmit } = this.props;
    return (
      <form onSubmit={handleSubmit}>
        <Field name="email" type="email" component={emailField} />
        <Field name="name" component={nameField} />
        <Field name="password" type="password" component={passwordField} />
        <Field name="passwordConfirm" type="password" component={passwordConfirmField} />
        <button type="submit" className="Button">Next</button>
      </form>
    )
  }
}

SurveyFirstPage = reduxForm({
  form: 'survey',
  destroyOnUnmount: false,
  forceUnregisterOnUnmount: true,
  validate
})(SurveyFirstPage);

export default SurveyFirstPage;