import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from '../../../actions/events.jsx';
import { hashHistory } from 'react-router';
import Event from './event.jsx';
import axios from 'axios';
import FlatButton from 'material-ui/FlatButton';
import {GridList, GridTile} from 'material-ui/GridList';
import IconButton from 'material-ui/IconButton';
import StarBorder from 'material-ui/svg-icons/toggle/star-border';

const styles = {
  root: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
    width: '100%',
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
      page: 0
    }
    this.fetchEvents = this.fetchEvents.bind(this);
    this.viewAll = this.viewAll.bind(this);
    this.viewPast = this.viewPast.bind(this);
    this.viewFuture = this.viewFuture.bind(this);
    this.viewEvent = this.viewEvent.bind(this);
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
        <div style={ styles.root }>
          <GridList style={ styles.gridList } cols={ 2.2 } >
            { this.props.events ? this.props.events.filter(cb).map((event, idx) => (
              <GridTile 
                key={ idx }
                title={ event.Title }
                subtitle={ <span>{ `hosted by ${ event.Owner }` }</span> }
                titleStyle={ styles.titleStyle }
                titleBackground="linear-gradient(to top, rgba(0,0,0,0.7) 0%,rgba(0,0,0,0.3) 70%,rgba(0,0,0,0) 100%))"
                onClick={ () => {this.viewEvent(event) }} 
              > 
                <img src={ event.Image } />
              </GridTile>
            )) : null }
          </ GridList>
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