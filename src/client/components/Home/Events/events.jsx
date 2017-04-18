import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from '../../../actions/events.jsx';
import { hashHistory } from 'react-router';
import Event from './event.jsx';
import axios from 'axios';
import FlatButton from 'material-ui/FlatButton';

class Events extends Component {
  constructor(props) {
    super(props);
    this.state = {
      view: "future",
      page: 0
    }
    this.fetchEvents = this.fetchEvents.bind(this);
    this.viewAll = this.viewAll.bind(this);
    this.viewPast = this.viewPast.bind(this);
    this.viewFuture = this.viewFuture.bind(this);
  }

  componentDidMount() {
    this.fetchEvents();
  }

  fetchEvents() {
    this.props.getEvents(this.props.email);
  }

  viewEvent(event) {
    hashHistory.push(`/events/${event.Key}`)
  }

  viewAll() {
    this.setState({
      view: "all"
    });
  }

  viewPast() {
    this.setState({
      view: "past"
    });
  }

  viewFuture() {
    this.setState({
      view: "future"
    });
  }


  render() {
    let cb = (e) => true;
    if (this.state.view === "past") {
      cb  = (e) => {
        let date = Date.parse(e.Original_Date);
        return date <= new Date();
      }
    } else if (this.state.view === "future") {
      cb  = (e) => {
        let date = Date.parse(e.Original_Date);
        return date > new Date();
      }
    }

    return (
      <div className="home_event">
        <div className="home_event_date">
          <FlatButton label="All" onClick={this.viewAll} />
          <FlatButton label="Past" onClick={this.viewPast} />
          <FlatButton label="Future" onClick={this.viewFuture} />
        </div>
        <div>
          <div>
            { this.props.events ? this.props.events.filter(cb).map((event, idx) => <Event key={idx} event={ event } viewEvent={this.viewEvent.bind(this, event)} />) : null }
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