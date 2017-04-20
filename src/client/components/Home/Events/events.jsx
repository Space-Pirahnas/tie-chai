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
import GridTile from './GridTile.js';

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
      hover: false
    }
    this.fetchEvents = this.fetchEvents.bind(this);
    this.viewAll = this.viewAll.bind(this);
    this.viewPast = this.viewPast.bind(this);
    this.viewFuture = this.viewFuture.bind(this);
    this.viewEvent = this.viewEvent.bind(this);
    this.mouseOver = this.mouseOver.bind(this);
    this.mouseOut = this.mouseOut.bind(this);
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

  mouseOver() {
    this.setState({
      hover: true
    })
    console.log(`this.state.hover on mouseOver: ${this.state.hover}`)
  }

  mouseOut() {
    this.setState({
      hover: false
    })
    console.log(`this.state.hover on mouseOut: ${this.state.hover}`)
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

    return (
      <div className="home_event">
        <div className="home_event_date">
          <FlatButton label="All" onClick={this.viewAll} />
          <FlatButton label="Past" onClick={this.viewPast} />
          <FlatButton label="Future" onClick={this.viewFuture} />
        </div>
        <div style={styles.root}>
          <GridList style={styles.gridList} cols={2.2}>
            {this.props.events ? this.props.events.filter(cb).map((event, idx) => (
              <GridTile
                className="event"
                key={ idx }
                title={ event.Title }
                subtitle={ this.state.hover ? <div>{`${ event.Location } on ${ event.Date }` }</div> : <div>{`hosted by ${event.Owner}`}</div>}
                subtitleStyle={{ 'display': 'flex', 'flexFlow': 'row wrap', 'whiteSpace': 'wrap',  }}
                titleBackground="linear-gradient(to bottom, rgba(0,0,0,0.7) 0%,rgba(0,0,0,0.3) 70%,rgba(0,0,0,0) 100%)"
                onMouseEnter={() => this.mouseOver()}
                onMouseLeave={() => this.mouseOut()}
                onClick={() => { this.viewEvent(event) } }
                >
                <img src={event.Image} width={220} />
              </GridTile>
            )) : null}
          </ GridList>
        </div>
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