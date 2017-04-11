import React from 'react';
import { connect } from 'react-redux'
import { reduxForm, Field } from 'redux-form';
import { signupFields } from '../form-fields.jsx';
import validate from './validate.jsx';
<<<<<<< HEAD
import Multiselect from 'react-widgets/lib/Multiselect';
import DropdownList from 'react-widgets/lib/DropdownList';
import * as actions from '../../../actions/interests.jsx';
=======
import { RadioButton, RadioButtonGroup } from 'material-ui/RadioButton';
import Multiselect from 'react-widgets/lib/Multiselect';
import DropdownList from 'react-widgets/lib/DropdownList';
import * as actions from '../../../actions/interests.jsx';

>>>>>>> Fix survey submission bug

const { cityField, renderTextField, renderCheckBox } = signupFields;
const renderDropDownList = ({ input, ...rest }) => <DropdownList {...input} {...rest}/>;

const renderMultiselect = ({ input, ...rest }) => <Multiselect {...input} onBlur={() => input.onBlur()} value={input.value || []} {...rest}/>;

const renderDropDownList = ({ input, ...rest }) => <DropdownList {...input} {...rest}/>;

<<<<<<< HEAD
const renderMultiselect = ({ input, ...rest }) => <Multiselect {...input} onBlur={() => input.onBlur()} value={input.value || []} {...rest}/>;

class SurveySecondPage extends React.Component {
  constructor(props) {
    super(props);
  }

=======
    this.state = {
      interests: ["Golang", "JavaScript", "Finance", "Accounting"],
      cities : ["San Francisco - CA", "San Jose - CA", "Seattle - WA"]
    }
  }

>>>>>>> Fix survey submission bug
  render() {
    const { handleSubmit, previousPage } = this.props;
    return (
<<<<<<< HEAD
      <form onSubmit={handleSubmit}>
        <Field name="profession" component={ renderTextField } label="Profession"/>
        <Field name="company" component={ renderTextField } label="Company"/>
        <Field name="bio" component={ renderTextField } label="About me" multiLine={ true } rows={ 2 } />
        <div>
          <label>Interests</label>
          <Field name="interests" component={renderMultiselect} defaultValue={[]} onBlur={() => props.onBlur()} data={this.props.interests.map(i => i.Interest_Name)}/>
        </div>
=======
      <form onSubmit={ handleSubmit }>
        <Field name="city" component={ cityField }>
          {
            this.state.cities.map((city, index) => 
              <RadioButton key={ index } value={ city } label={ city } />
            )
          }
        </Field>
        <Field name="profession" component={ renderTextField } label="Profession"/>
        <Field name="company" component={ renderTextField } label="Company"/>
        <Field name="bio" component={ renderTextField } label="About me" multiLine={ true } rows={ 2 } />
        <h3>Interests</h3>
        {
          this.state.interests.map((interest, index) => 
            <Field key={ index } name={interest} value={ interest } component={ renderCheckBox } label={ interest } />
          )
        }
>>>>>>> Fix survey submission bug
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