import React, { Component } from 'react';

export default Comment = props => {
  let comment = props.comment.Comment;
  let user = props.comment.User;
  return(
    <div>
      <div>{user.Name}</div>
      <div>{user.Image}</div>
      <div>{comment.CreatedAt}</div>
      <div>{comment.Text}</div>
      <div>{comment.Subject}</div>
    </div>
  )
}

