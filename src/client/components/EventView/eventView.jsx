import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from '../../actions/events.jsx';
import FlatButton from 'material-ui/FlatButton';
import { hashHistory } from 'react-router';
import Comment from './Comments/comment.jsx';
import SubmitComment from './Comments/submitComment.jsx';

class EventView extends Component {

  constructor(props) {
    super(props);
    this.state = {
      comment: false
    }
    this.RSVP = this.RSVP.bind(this);
    this.deleteRSVP = this.deleteRSVP.bind(this);
    this.props.getTargetEvent(this.props.params.eventID);
    this.toggleComment = this.toggleComment.bind(this);
  }

  toggleComment(){
    this.setState({
      comment: !this.state.comment
    });
  }

  RSVP(){
    this.props.rsvpForEvent(this.props.user.Email, this.props.params.eventID);
  }

  deleteRSVP(){
    this.props.deleteRSVP(this.props.user.Email, this.props.params.eventID);
  }

  routeToAttendee(attendee){
    hashHistory.push(`/profile/${attendee.Email}`);
  }


  render(){
    if (this.props.event.target) {
      console.log(this.props.event.target);
      return(
        <div>
          <div className="home">
            <div>
              <img src={this.props.event.target.Image} className="event_page_image" />
            </div>
            <div className="attendees">
              <h1>{this.props.event.target.Attendees ?  this.props.event.target.Attendees.length : 0} - Attendees</h1>
              {this.props.event.target.Attendees ? this.props.event.target.Attendees.map((attendee, i) => <FlatButton onClick={this.routeToAttendee.bind(this, attendee)} key={i} label={attendee.Name} />) : null}
              {this.props.event.rsvp ? <FlatButton label="rsvp" onClick={this.RSVP} primary={true} /> : <FlatButton label="cancel rsvp" onClick={this.deleteRSVP} secondary={true} />}
            </div>
          </div>
          <FlatButton label="Write A Comment!" onClick={this.toggleComment} />
          {this.state.comment ? <SubmitComment toggleComment={this.toggleComment} eventKey={this.props.params.eventID} /> : null } 
          {this.props.event.target.Comments ? this.props.event.target.Comments.map((c, i) => <Comment comment={c} key={i} />) : null}
        </div>
      )
    } else {
      return <div>Loading....</div>
    }
  }
}

function mapStateToProps(state) {
  return {
    event: state.targetEvent,
    user: state.userInfo.user
  }
}

export default connect(mapStateToProps, actions)(EventView);