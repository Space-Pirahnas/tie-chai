const validate = values => {
  const errors = {}
  const requiredFields = ['firstName', 'lastName', 'email', 'password', 'passwordConfirm', 'city', 'state','interests']

  requiredFields.forEach(field => {
    if (!values[field]) {
      errors[field] = 'Required'
    }
  })

  if (!values.signinpw) {
    errors.signinpw = 'Please enter a password';
  }
  if (values.password !== values.passwordConfirm) {
    errors.password = 'Passwords do not match';
  }
  if (values.email && !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
    errors.email = 'Invalid email address'
  }
  if (!values.interest) {
    errors.interest = 'Require at least one interest';
  }

  return errors
}

export default validate