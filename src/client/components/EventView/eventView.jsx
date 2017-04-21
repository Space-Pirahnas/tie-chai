import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from '../../actions/events.jsx';
import { hashHistory } from 'react-router';
import { Card, CardActions, CardHeader, CardMedia, CardTitle, CardText } from 'material-ui/Card';
import FlatButton from 'material-ui/FlatButton';
import { Rating } from 'material-ui-rating';
import Comment from './Comments/comment.jsx';
import SubmitComment from './Comments/submitComment.jsx';
import TimeLocation from './timeLocation.jsx';

class EventView extends Component {

  constructor(props) {
    super(props);
    this.state = {
      comment: false
    }
    this.RSVP = this.RSVP.bind(this);
    this.deleteRSVP = this.deleteRSVP.bind(this);
    this.props.getTargetEvent(this.props.params.eventID, this.props.user.Email);
    this.toggleComment = this.toggleComment.bind(this);
    this.deleteEvent = this.deleteEvent.bind(this);
  }

  toggleComment() {
    this.setState({
      comment: !this.state.comment
    });
  }

  RSVP() {
    this.props.rsvpForEvent(this.props.user.Email, this.props.params.eventID);
  }

  deleteRSVP() {
    this.props.deleteRSVP(this.props.user.Email, this.props.params.eventID);
  }

  routeToAttendee(attendee) {
    hashHistory.push(`/profile/${attendee.Email}`);
  }

  deleteEvent() {
    this.props.deleteEvent(this.props.user.Email, this.props.params.eventID);
  }


  render() {
    if (this.props.event.target) {
      console.log("In the eventView the target event is ", this.props.event.target);
      console.log('In the eventView the Owner of Event is ', this.props.user);
      const { Image, Email, Attendees,
        Comments, Title, Date, Business,
        Location, Owner, Description, Rating } = this.props.event.target;
      const eventOwner = this.props.user
      return (
        <div style={{ "marginTop": "15%" }}>
          <Card className="eventCardContainer">
            <CardHeader
              title={<i className="fa fa-user-o"> {Owner}</i>}
              subtitle={<i className="fa fa-book"> {eventOwner.Bio}</i>}
              avatar={eventOwner.Image ? eventOwner.Image : "styles/noprofile.png"}
            >
            </CardHeader>
            <CardMedia
              overlay={<CardTitle className='event-display-linebreak' title={Title} subtitle={"by " + `${Owner}` + "\n" + `${Date}`} />}
            >
              <img src={Image} />
            </CardMedia>
            <CardTitle title={Title} subtitle={`${Attendees ? Attendees.length : 0}` + ' going'} />
            <TimeLocation datetime={Date} business={Business} location={Location} />
            <CardText>
              {Description}
            </CardText>
            <CardActions>
              {this.props.event.rsvp ? <FlatButton label="RSVP" onClick={this.RSVP} primary={true} hoverColor="#EDECEC" /> : <FlatButton label="Cancel RSVP" onClick={this.deleteRSVP} secondary={true} hoverColor="#EDECEC"/>}
              <FlatButton label="Comment" icon={<i className="fa fa-comment-o" />} hoverColor="#EDECEC" onClick={this.toggleComment} />
              {this.props.user.Email === Email ? <FlatButton label="Delete" icon={<i className="fa fa-trash-o"/>} secondary={true} onClick={this.deleteEvent} hoverColor="#EDECEC" /> : null}
            </CardActions>
            {this.state.comment ? <SubmitComment toggleComment={this.toggleComment} eventKey={this.props.params.eventID} /> : null}
          </Card>

          <div>
            <div className="attendees">
              <h1>{Attendees ? Attendees.length : 0} - Attendees</h1>
              {Attendees ? Attendees.map((attendee, i) => <FlatButton onClick={this.routeToAttendee.bind(this, attendee)} key={i} label={attendee.Name} />) : null}
            </div>
          </div>
          
          {Comments ? Comments.map((c, i) => <Comment comment={c} key={i} />) : null}
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
    user: state.userInfo.user,
  }
}

export default connect(mapStateToProps, actions)(EventView);