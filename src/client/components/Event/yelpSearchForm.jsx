import React from 'react'
import { connect } from 'react-redux';
import { Field, reduxForm } from 'redux-form'
import TextField from 'material-ui/TextField'
import Business from './business.jsx';

const renderTextField = ({ input, label, meta: { touched, error }, ...custom }) => (
  <TextField placeholder="" hintText={label}
    floatingLabelText={label}
    errorText={touched && error}
    {...input}
    {...custom}
  />
)

const validate = values => {
  const errors = {}
  const requiredFields = ['locationYelp', 'keywordYelp']
  requiredFields.forEach(field => {
    if (!values[field]) {
      errors[field] = 'Required'
    }
  })
  return errors
}

const YelpSearchForm = props => {
  const { handleSubmit, pristine, reset, submitting } = props;
  return (
    <div>
      <form onSubmit={handleSubmit}>
        <div>
          <Field name="locationYelp" id="google_auto" component={renderTextField} label="Location" />
        </div>
        <div>
          <Field name="keywordYelp" component={renderTextField} label="Keyword" />
        </div>
        <div>
          <button type="submit" disabled={pristine || submitting}>Yelp <i className="fa fa-yelp <fa-lg></fa-lg>" style={{"color": "red"}}></i></button>
        </div>
      </form>
    </div>
  )
}

export default reduxForm({
  form: 'YelpSearchForm',
  validate
})(YelpSearchForm)
