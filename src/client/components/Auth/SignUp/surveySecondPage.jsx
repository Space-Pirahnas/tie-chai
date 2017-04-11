import React from 'react';
import { connect } from 'react-redux'
import { reduxForm, Field } from 'redux-form';
import { signupFields } from '../form-fields.jsx';
import validate from './validate.jsx';
import Multiselect from 'react-widgets/lib/Multiselect';
import DropdownList from 'react-widgets/lib/DropdownList';
import * as actions from '../../../actions/interests.jsx';

const { cityField, interestField,
        stateField, professionField, 
        companyField, bioField
      } = signupFields;

const renderDropDownList = ({ input, ...rest }) => <DropdownList {...input} {...rest}/>;

const renderMultiselect = ({ input, ...rest }) => <Multiselect {...input} onBlur={() => input.onBlur()} value={input.value || []} {...rest}/>;

class SurveySecondPage extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { handleSubmit, previousPage } = this.props;
    return (
      <form onSubmit={handleSubmit}>
        <Field name="profession" component={professionField} />
        <Field name="company" component={companyField} />
        <div>
        <label>City</label>
          <Field name="city" component={renderDropDownList} data={this.props.cities.map(c => c.City_Name)} valueField="value" textField="city"/>
        </div>
        <Field name="state" component={stateField} />
        <div>
        <label>Interests</label>
          <Field name="interests" component={renderMultiselect} defaultValue={[]} onBlur={() => props.onBlur()} data={this.props.interests.map(i => i.Interest_Name)}/>
        </div>
        <Field name="bio" component={bioField} />
        <div>
          <button type="button" className="previous" onClick={previousPage}>Previous</button>
          <button type="submit">Sign Up</button>
        </div>
      </form>
    )
  }
}

SurveySecondPage = reduxForm({
  form: 'survey',
  destroyOnUnmount: false,
  forceUnregisterOnUnmount: true,
  validate
})(SurveySecondPage);

function mapStateToProps(state){
  return {
    cities: state.cities,
    interests: state.interests
  }
}

export default connect(mapStateToProps, actions)(SurveySecondPage);