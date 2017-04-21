import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from '../../../actions/events.jsx';
import { hashHistory } from 'react-router';

class LatestEvent extends Component {
  constructor(props) {
    super(props);

    console.log(`this.props.event: ${this.props.event}`);
  }

  render() {
    <div className="eventBackground" style={{backgroundImage: "url(styles/white_leather.png)" }}>
      <div className="latestEventContainer">
        <h1>{this.props.event.Title}</h1>
        <div className="eventSubtitle">
          <div className="eventLocation">
            {this.props.event.Location}
          </div>
          <div className="eventDate">
            {this.props.event.Date}
          </div>
          <div className="eventOwner">
            {this.props.event.Owner}
          </div>
          <div className="eventDescription">
            {this.props.event.Description}
          </div>
        </div>
      </div>
    </div>
  }
};

export default LatestEvent;