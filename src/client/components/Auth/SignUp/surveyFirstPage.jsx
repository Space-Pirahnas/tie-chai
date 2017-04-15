import React from 'react';
import { connect } from 'react-redux'
import { reduxForm, Field } from 'redux-form';
import { signupFields } from '../form-fields.jsx';
import validate from './validate.jsx';
import injectTapEventPlugin from 'react-tap-event-plugin';
injectTapEventPlugin();

const { renderTextField } = signupFields;

class SurveyFirstPage extends React.Component {
  render() {
    const { handleSubmit } = this.props;
    return (
      <form onSubmit={ handleSubmit }>
        <div>
          <Field name="email" type="email" component={ renderTextField } label="Email" />
        </div>
        <div>
          <Field name="firstName" component={ renderTextField } label="First Name"/>
          <Field name="lastName" component={ renderTextField } label="Last Name"/>
        </div>
        <div>
          <Field name="password" type="password" component={ renderTextField } label="Password"/>
          <Field name="passwordConfirm" type="password" component={ renderTextField } label="Comfirm Password"/>
        </div>
        <button type="submit" className="Button survey">Next</button>
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