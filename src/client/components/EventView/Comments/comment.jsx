import React, { Component } from 'react';
import { connect } from 'react-redux';
import { ListItem } from 'material-ui/List';
import Avatar from 'material-ui/Avatar';
import {grey400, darkBlack, lightBlack} from 'material-ui/styles/colors';
import timeago from 'timeago.js';
import * as actions from '../../../actions/comments.jsx';


const Comment = props => {
  let comment = props.comment.Comment;
  let { Name, Image, Email } = props.comment.User;
  let deleteComment = () => {
    props.deleteCommentEvent(props.event.target.Key, Email, comment.Text, comment.createdAt);
  }
  const time = timeago().format(Date.parse(comment.CreatedAt));
  const samePerson = localStorage.getItem('user_email') === Email;
  return (
      <ListItem
        leftAvatar={<Avatar src={Image ? Image : "styles/noprofile.png"} />}
        rightIcon={samePerson? <i className="fa fa-trash-o" onClick={deleteComment}/> : null}
        primaryText={Name}
        secondaryText={
          <div height={'100%'} >
            <span style={{ color: darkBlack }}>{comment.Subject}</span><br />
            <p><span>{comment.Text}</span> -- <span>{time}</span></p>
          </div>
        }
        secondaryTextLines={2}
      />
  )
}

function mapStateToProps(state){
  return {
    event: state.targetEvent
  }
}

export default connect(mapStateToProps, actions)(Comment);

