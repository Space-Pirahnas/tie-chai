import React from 'react';
import { connect } from 'react-redux';
import * as actions from '../../../actions/index.jsx';
import SignInForm from './signinForm.jsx';

class SignIn extends React.Component {
  constructor(props) {
    super(props);
    this.handleFormSubmit = this.handleFormSubmit.bind(this);
  }

  handleFormSubmit({email, password}) {
    this.props.signinUser({email, password});  
  }

  render() {
    return (
      <div style={{"margin": "10% auto", "width": "50%"}}>
        <h2>Sign In!</h2>
        <SignInForm onSubmit={this.handleFormSubmit} />
      </div>
    )
  }
}

function mapStateToProps(state) {
  return { errorMessage: state.auth.error };
}

export default connect(mapStateToProps, actions)(SignIn);