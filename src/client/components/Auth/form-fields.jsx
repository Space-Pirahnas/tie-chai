import React from 'react';
import TextField from 'material-ui/TextField';
import { RadioButton, RadioButtonGroup } from 'material-ui/RadioButton';
import Checkbox from 'material-ui/Checkbox';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';

export const signinField = {
  emailField: email => (
    <fieldset className="form-group">
      <label>Email: </label>
      <input className="form-control" {...email.input} />
      {email.meta.touched && email.meta.error && <div className="error">{email.meta.error}</div>}
    </fieldset>
  ),

  passwordField: password => (
    <fieldset className="form-group">
      <label>Password: </label>
      <input className="form-control" type="password" {...password.input} />
      {password.meta.touched && password.meta.error && <div className="error">{password.meta.error}</div>}
    </fieldset>
  )
}

export const signupFields = {

  
  renderTextField: ({ input, label, meta: { touched, error }, ...custom }) => (
  <TextField hintText={ label }
    floatingLabelText={ label }
    errorText={ touched && error }
    { ...input }
    { ...custom } 
  /> 
  ),

  cityField: ({ input, ...rest }) => (
    <RadioButtonGroup { ...input } { ...rest }
      valueSelected={ input.value }
      onChange={(event, value) => input.onChange(value)}/> 
  ),

  renderCheckBox: ({ input, label }) => (
    <Checkbox label={ label } 
      checked={ input.value ? true : false }
      onCheck={ input.onChange }
    />
  )
}