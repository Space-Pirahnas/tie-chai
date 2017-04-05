import React from 'react';

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
      <input className="form-control" {...password.input} />
      {password.meta.touched && password.meta.error && <div className="error">{password.meta.error}</div>}
    </fieldset>
  )
}

export const signupFields = {
  emailField: email => (
    <fieldset className="form-group">
      <label>Email: </label>
      <input className="form-control" {...email.input} />
      {email.meta.touched && email.meta.error && <div className="error">{email.meta.error}</div>}
    </fieldset>
  ),

  nameField: name => (
    <fieldset className="form-group">
      <label>Name: </label>
      <input className="form-control" {...name.input} />
      {name.meta.touched && name.meta.error && <div className="error">{name.meta.error}</div>}
    </fieldset>
  ),

  passwordField: password => (
    <fieldset className="form-group">
      <label>Password: </label>
      <input className="form-control" {...password.input} />
      {password.meta.touched && password.meta.error && <div className="error">{password.meta.error}</div>}
    </fieldset>
  ),

  passwordConfirmField: passwordConfirm => (
    <fieldset className="form-group">
      <label>Confirm Password: </label>
      <input className="form-control" {...passwordConfirm.input} />
      {passwordConfirm.meta.touched && passwordConfirm.meta.error && <div className="error">{passwordConfirm.meta.error}</div>}
    </fieldset>
  ),

  cityField: city => (
    <fieldset className="form-group">
      <label>City: </label>
      <input className="form-control" {...city.input} />
      {city.meta.touched && city.meta.error && <div className="error">{city.meta.error}</div>}
    </fieldset>
  ),

  interestField: interest => (
    <fieldset className="form-group">
      <label>Interest: </label>
      <input className="form-control" {...interest.input} />
      {interest.meta.touched && interest.meta.error && <div className="error">{interest.meta.error}</div>}
    </fieldset>
  )

}