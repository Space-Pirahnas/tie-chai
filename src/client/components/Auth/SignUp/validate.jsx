const validate = values => {
  const errors = {}
  if (!values.name) {
    errors.name = 'Please enter your full name'
  }
  if (!values.signinpw) {
    errors.signinpw = 'Please enter a password';
  }
  if (!values.password) {
    errors.password = 'Please enter a password';
  }
  if (!values.passwordConfirm) {
    errors.passwordConfirm = 'Please enter a password confirmation';
  }
  if (values.password !== values.passwordConfirm) {
    errors.password = 'Please enter a same password';
  }
  if (!values.email) {
    errors.email = 'Required email'
  } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
    errors.email = 'Invalid email address'
  }
  if (!values.city) {
    errors.city = 'Required'
  }
  if (!values.interest) {
    errors.interest = 'Required at least one interest';
  }

  return errors
}

export default validate