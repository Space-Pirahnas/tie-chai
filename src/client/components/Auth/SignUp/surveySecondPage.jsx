import React from 'react';
import { connect } from 'react-redux'
import { reduxForm, Field } from 'redux-form';
import { signupFields } from '../form-fields.jsx';
import validate from './validate.jsx';

const { cityField, interestField,
        stateField, professionField, 
        companyField, bioField
      } = signupFields;

class SurveySecondPage extends React.Component {
  render() {
    const { handleSubmit, previousPage } = this.props;
    return (
      <form onSubmit={handleSubmit}>
        <Field name="city" component={cityField} />
        <Field name="state" component={stateField} />
        <Field name="profession" component={professionField} />
        <Field name="company" component={companyField} />
        <Field name="bio" component={bioField} />
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
  forceUnregisterOnUnmount: true,
  validate
})(SurveySecondPage);

export default SurveySecondPage;