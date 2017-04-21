import React, { Component } from 'react';
import { ListItem } from 'material-ui/List';
import Avatar from 'material-ui/Avatar';
import {grey400, darkBlack, lightBlack} from 'material-ui/styles/colors';
import timeago from 'timeago.js';


export default Comment = props => {
  let comment = props.comment.Comment;
  let { Name, Image } = props.comment.User;
  const time = timeago().format(Date.parse(comment.CreatedAt));
  console.log('++++++++++++++++++', time)
  return (
      <ListItem
        leftAvatar={<Avatar src={Image ? Image : "styles/noprofile.png"} />}
        primaryText={Name}
        secondaryText={
          <div>
            <span style={{ color: darkBlack }}>{comment.Subject}</span><br />
            <p><span>{comment.Text}</span> -- <span>{time}</span></p>
          </div>
        }
        secondaryTextLines={2}
      />
  )
}

