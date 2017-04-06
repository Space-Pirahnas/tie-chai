import React from 'React';
import { Field, reduxForm } from 'redux-form';
import { EventField } from './eventformfields.jsx';

const { titleField, locationField, meetTimeField, descriptionField } = EventField;

const EventForm = (props) => {
  const { handleSubmit, pristine, reset, submitting } = props;
  return (
    <form onSubmit={handleSubmit}>
      <Field name='title' component={titleField} placeholder="Event Title" />
      <Field name='location' component={locationField} placeholder="Meeting Location" />
      <Field name='meettime' component={meetTimeField} />
      <Field name='description' component={descriptionField} />
      <div>
        <button type="submit" disabled={pristine || submitting}>Post Event</button>
        <button type="button" disabled={pristine || submitting} onClick={reset}>Reset</button>
      </div>
    </form>
  )
}

const validate = (values) => {
  const errors = {};

  if (!values.title) {
    errors.title = 'Please enter an title';
  }

  if (!values.location) {
    errors.location = 'Please enter a location';
  }

  if (!values.meettime) {
    errors.meettime = 'Please enter a time to meet';
  }

  return errors;
}

export default reduxForm({
  form: 'event-form',
  validate
})(EventForm)