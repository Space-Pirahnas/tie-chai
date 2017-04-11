import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from '../../../actions/events.jsx';
import Event from './event.jsx';
import axios from 'axios';

class Events extends Component {
  constructor(props) {
    super(props);
    this.state = {
      mounted: false
    }
    this.fetchEvents = this.fetchEvents.bind(this);
  }

  componentDidMount() {
    this.fetchEvents();
  }

  fetchEvents() {
    this.props.getEvents(this.props.email);
  }

  render() {
    return (
      <div>
        { this.props.events ? this.props.events.map((event, idx) => <Event key={idx} event={ event } />) : null }
      </div>
    )
  }
}

function mapStateToProps(state){
  return {
    email: state.userInfo.user.Email,
    events: state.events
  }
}

export default connect(mapStateToProps, actions )(Events);