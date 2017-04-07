import React, { Component } from 'react';
import Event from './event.jsx';
import axios from 'axios';

class Events extends Component {
  constructor(props) {
    super(props);
    this.state = {
      events: [],
      mounted: false
    }
    this.fetchEvents = this.fetchEvents.bind(this);
  }

  fetchEvents() {
    axios.get('./events')
    .then(response => {
      this.setState({
        events: [...events, response]
      });
    })
    .catch(err => {
      console.log(`Error in fetching events: ${error}`);
    })
  }

  render() {
    return (
      <div>
        {
          this.state.events.map(event => 
            <Event event={ event } />
          )
        }
      </div>
    )
  }
}

export default Events;