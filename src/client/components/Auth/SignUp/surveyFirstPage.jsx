import React from 'react';
import { connect } from 'react-redux'
import { reduxForm, Field } from 'redux-form';
import { signupFields } from '../form-fields.jsx';

const { emailField, nameField, passwordField } = signupFields;

class SurveyFirstPage extends React.Component {
  render() {
    const { handleSubmit } = this.props;
    return (
      <form onSubmit={handleSubmit}>
        <Field name="email" type="email" component={emailField} />
        <Field name="name" component={nameField} />
        <Field name="password" type="password" component={passwordField} />
        <button type="submit" className="next">Next</button>
      </form>
    )
  }
}

SurveyFirstPage = reduxForm({
  form: 'survey',
  destroyOnUnmount: false,
  forceUnregisterOnUnmount: true
})(SurveyFirstPage);

export default SurveyFirstPage;