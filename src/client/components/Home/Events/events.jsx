import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from '../../../actions/events.jsx';
import { hashHistory } from 'react-router';
import Event from './event.jsx';
import axios from 'axios';

import FlatButton from 'material-ui/FlatButton';
import Popover from 'material-ui/Popover';
import Menu from 'material-ui/Menu';
import MenuItem from 'material-ui/MenuItem';

class Events extends Component {
  constructor(props) {
    super(props);
    this.state = {
      view: "all",
      page: 0
    }
    this.fetchEvents = this.fetchEvents.bind(this);
  }

  componentDidMount() {
    this.fetchEvents();
  }

  fetchEvents() {
    this.props.getEvents(this.props.email);
  }

  viewEvent(event) {
    hashHistory.push(`/events/${event.ID}`)
  }

  viewPast() {
    this.setState({
      view: "past"
    });
  }

  render() {
    if (this.state.view === "past") {
      this.props.events = 
    }

    return (
      <div className="home_event">
        <div className="home_event_date">
          <FlatButton label="All" />
          <FlatButton label="Past" />
          <FlatButton label="Future" />
        </div>
        <div>
          <div>
            { this.props.events ? this.props.events.filter(cb).slice(0 * page, 4).map((event, idx) => <Event key={idx} event={ event } viewEvent={this.viewEvent.bind(this, event)} />) : null }
          </div>
        </div>
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