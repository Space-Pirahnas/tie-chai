import React from 'react';
import { connect } from 'react-redux'
import { reduxForm, Field } from 'redux-form';
import * as actions from '../../../actions/index.jsx';
import Survey from './survey.jsx';


class SignUp extends React.Component {
  constructor(props) {
    super(props);
    this.handleFormSubmit = this.handleFormSubmit.bind(this);
  }

  handleFormSubmit(values) {
    const signupObj = {
      Name: values.name,
      Email: values.email,
      Password: values.password,
      City: values.city,
      State: values.state,
      Profession: values.profession,
      Company: values.company,
      Bio: values.bio,
      Interests: values.interest.split(','),
      Image: ""
    }
    console.log("the form value from survey OBJ send to server ", signupObj);
    this.props.signupUser(signupObj);
    
  }

  render() {
    return (
      <div style={{"margin": "10% auto", "width": "50%"}}>
        <h2>Sign Up!</h2>
        <Survey onSubmit={this.handleFormSubmit} />
      </div>
    );
  }
};

function mapStateToProps(state) {
  return { errorMessage: state.auth.error };
}

export default connect(mapStateToProps, actions)(SignUp);