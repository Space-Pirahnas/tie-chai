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
      <input className="form-control" type="password" {...password.input} />
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
      <input className="form-control" type="password" {...password.input} />
      {password.meta.touched && password.meta.error && <div className="error">{password.meta.error}</div>}
    </fieldset>
  ),

  passwordConfirmField: passwordConfirm => (
    <fieldset className="form-group">
      <label>Confirm Password: </label>
      <input className="form-control" type="password" {...passwordConfirm.input} />
      {passwordConfirm.meta.touched && passwordConfirm.meta.error && <div className="error">{passwordConfirm.meta.error}</div>}
    </fieldset>
  ),

  stateField: livingState => (
    <fieldset className="form-group">
      <label>State: </label>
      <input className="form-control" {...livingState.input} />
      {livingState.meta.touched && livingState.meta.error && <div className="error">{livingState.meta.error}</div>}
    </fieldset>
  ),

  professionField: profession => (
    <fieldset className="form-group">
      <label>Profession: </label>
      <input className="form-control" {...profession.input} />
      {profession.meta.touched && profession.meta.error && <div className="error">{profession.meta.error}</div>}
    </fieldset>
  ),

  companyField: company => (
    <fieldset className="form-group">
      <label>Company: </label>
      <input className="form-control" {...company.input} />
      {company.meta.touched && company.meta.error && <div className="error">{company.meta.error}</div>}
    </fieldset>
  ),

  bioField: aboutme => (
    <fieldset className="form-group">
      <label>About Me: </label>
      <input className="form-control" {...aboutme.input} />
      {aboutme.meta.touched && aboutme.meta.error && <div className="error">{aboutme.meta.error}</div>}
    </fieldset>
  )

}