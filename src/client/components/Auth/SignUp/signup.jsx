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
    console.log(values, "valuyes herere");
    const signupObj = {
      Name: `${values.firstName} ${values.lastName}` ,
      Email: values.email,
      Password: values.password,
      City: values.city,
      State: values.state,
      Profession: values.profession,
      Company: values.company,
      Bio: values.bio,
      Interests: values.interests,
      Image: ""
    }
    console.log("the form value from survey OBJ send to server ", signupObj);
    this.props.signupUser(signupObj);
    
  }

  render() {
    return (
      <div>
        <div id="hero" className="Hero" style={{ "backgroundColor": "white" }}>
          <div style={{"margin": "10% auto", "width": "50%"}}>
            <h2 style={{ "color": "black" }} >Sign Up!</h2>
            <Survey onSubmit={this.handleFormSubmit} />
          </div>
        </div>
      </div>
    );
  }
};

function mapStateToProps(state) {
  return { errorMessage: state.auth.error };
}

export default connect(mapStateToProps, actions)(SignUp);