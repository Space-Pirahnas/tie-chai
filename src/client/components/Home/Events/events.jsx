import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from '../../../actions/events.jsx';
import { hashHistory } from 'react-router';
import Event from './event.jsx';
import axios from 'axios';
import FlatButton from 'material-ui/FlatButton';
import GridList from 'material-ui/GridList';
import IconButton from 'material-ui/IconButton';
import StarBorder from 'material-ui/svg-icons/toggle/star-border';
import LatestEvent from './latestEvent.jsx';

import Tile from './tile.jsx';

const styles = {
  root: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
  },
  gridList: {
    display: 'flex',
    flexWrap: 'nowrap',
    overflowX: 'auto',
  },
  titleStyle: {
    color: 'rgb(0, 188, 212)',
  },
};


class Events extends Component {
  constructor(props) {
    super(props);
    this.state = {
      view: "future",
      page: 0,
    }
    this.fetchEvents = this.fetchEvents.bind(this);
    this.viewAll = this.viewAll.bind(this);
    this.viewPast = this.viewPast.bind(this);
    this.viewFuture = this.viewFuture.bind(this);
  }

  componentWillMount() {
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
      cb = (e) => {
        let date = Date.parse(e.Original_Date);
        return date <= new Date();
      }
    } else if (this.state.view === "future") {
      cb = (e) => {
        let date = Date.parse(e.Original_Date);
        return date > new Date();
      }
    }
    let events = this.props.events ? this.props.events.filter(cb) : [];
    return (
      <div>
        {this.props.events && this.props.events.length && events.length ?
          <div className="eventBackground">
            <img className="eventBackgroundImage" src={events.length ? events[0].Image : null} />
            <div className="latestEventContainer">
              <h1 className="eventTitle">{events.length ? events[0].Title : ""}</h1>
              <div className="eventSubtitle">
                <div className="eventDate">
                  {events.length ? events[0].Date : ""}
                </div>
                <div className="eventLocation">
                  {events.length ? events[0].Location: ""}
                </div>
                <div className="eventOwner">
                  {events.length ? "with: " + events[0].Owner : ""}
                </div>
              </div>
            </div>
            <div className="home_event">
              <div className="home_event_date">
                <FlatButton style={{color: "white"}} label="All" onClick={this.viewAll} />
                <FlatButton secondary={true} label="Past" onClick={this.viewPast} />
                <FlatButton primary={true} label="Future" onClick={this.viewFuture} />
              </div>
              <div style={styles.root}>
                <GridList style={styles.gridList} cols={2.2}>
                  {events.length ? events.map((event, idx) => (
                      <Tile key={idx} event={event} viewEvent={this.viewEvent.bind(this, event)}/>
                  )) : null}
                </ GridList>
              </div>
            </div>
          </div> : <div className="eventBackground">
            <img className="eventBackgroundImage" src="styles/hotpot.jpg" />
            <div className="eventDefaultBackground">
              No Events
            </div>
        </div> }
      </div>
    )
  }
}

function mapStateToProps(state) {
  return {
    email: state.userInfo.user.Email,
    events: state.events
  }
}

export default connect(mapStateToProps, actions)(Events);