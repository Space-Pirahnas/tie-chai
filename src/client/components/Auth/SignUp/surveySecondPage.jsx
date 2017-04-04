import React from 'react';
import { connect } from 'react-redux'
import { reduxForm, Field } from 'redux-form';
import { signupFields } from '../form-fields.jsx';

const { locationField, interestField } = signupFields;

class SurveySecondPage extends React.Component {
  render() {
    const { handleSubmit, previousPage } = this.props;
    return (
      <form onSubmit={handleSubmit}>
        <Field name="location" component={locationField} />
        <Field name="interest" component={interestField} />
        <div>
          <button type="button" className="previous" onClick={previousPage}>Previous</button>
          <button type="submit">Sign Up</button>
        </div>
      </form>
    )
  }
}

SurveySecondPage = reduxForm({
  form: 'survey',
  destroyOnUnmount: false,
  forceUnregisterOnUnmount: true
})(SurveySecondPage);

export default SurveySecondPage;