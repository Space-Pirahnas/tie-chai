import React from 'react';
import TextField from 'material-ui/TextField';
import { RadioButton, RadioButtonGroup } from 'material-ui/RadioButton';
import Checkbox from 'material-ui/Checkbox';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';

const cities = ["San Francisco - CA", "San Jose - CA", "Seattle - WA"];
const interests = ["Golang", "JavaScript", "Finance", "Accounting"];

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

  
  renderTextField: props => (
  <TextField hintText={props.label}
    floatingLabelText={props.label}
    errorText={props.touched && props.error}
    {...props}
  />
  ),

  cityField: city => (
    <RadioButtonGroup>
      {
        cities.map(city => 
          <RadioButton value={ city } label={ city } />
        )
      }
    </RadioButtonGroup>
  ),

  renderCheckBox: props => (
    <Checkbox label={ props.label } 
      checked={ props.value ? true : false }
      onCheck={ props.onChange }
      {...props}
    />
  )
}