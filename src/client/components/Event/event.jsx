import React from 'react';
import EventForm from './eventForm.jsx';
import { GOOGLE_API } from '../../config.js'
import loadjs from 'loadjs';

class CreateEvent extends React.Component {
  constructor(props) {
    super(props);
    this.handleEventSubmit = this.handleEventSubmit.bind(this);
  }

  componentWillMount() {
    const url = "https://maps.googleapis.com/maps/api/js?key=" + GOOGLE_API + "&libraries=places";
    console.log("calling componentwillmount in event.jsx", url);
    loadjs(url, {
      success: () => {
        console.log("Successfully load google script");
      },
      error: (error) => {
        console.log("Fail to load google autocomplete api url");
      }
    })
  
  }

  handleEventSubmit(values) {
    console.log("handleEventSubmit values is  ", values);
  }

  render() {
    return (
      <div style={{"marginTop": "10%"}}>
        <h1>CreateEvent List From CreateEvent.jsx</h1>
        <EventForm onSubmit={this.handleEventSubmit} />
      </div>
    );
  }
};


export default CreateEvent;