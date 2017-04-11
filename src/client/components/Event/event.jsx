import React from 'react';
import EventForm from './eventForm.jsx';

class CreateEvent extends React.Component {
  constructor(props) {
    super(props);
    this.handleEventSubmit = this.handleEventSubmit.bind(this);
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