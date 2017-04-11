import React from 'react';
import EventForm from './eventForm.jsx';
import { GOOGLE_API } from '../../config.js'
import loadjs from 'loadjs';

class CreateEvent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      location : ''
    }
    this.handleEventSubmit = this.handleEventSubmit.bind(this);
    this.handleChangeAction = this.handleChangeAction.bind(this);
  }

  componentDidMount() {
    const url = "https://maps.googleapis.com/maps/api/js?key=" + GOOGLE_API + "&libraries=places";
    console.log("calling componentwillmount in event.jsx", url);
    loadjs(url, {
      success: () => {
        console.log("Successfully load google script");
        const input = document.getElementById('google_auto')
        console.log("input for autocomplete ", input);
      },
      error: (error) => {
        console.log("Fail to load google autocomplete api url");
      }
    })
  
  }

  handleChangeAction(values) {
    console.log("handleChangeAction Works ,", values);
  }

  handleEventSubmit(value) {
    console.log("handleEventSubmit values ", value);
  }

  render() {
    return (
      <div style={{"marginTop": "10%"}}>
        <h1>CreateEvent List From CreateEvent.jsx</h1>
        <EventForm onSubmit={this.handleEventSubmit} eventChange={this.handleChangeAction} />
      </div>
    );
  }
};


export default CreateEvent;