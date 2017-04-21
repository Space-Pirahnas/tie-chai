import React from 'react';
import Comment from './comment.jsx';
import { List } from 'material-ui/List';
import Subheader from 'material-ui/Subheader';

const ListComments = (props) => {
  const comments = props.comments;
  return (
    <List>
      <Subheader>{`${comments.length} Comments`}</Subheader>
      {comments.map((c, i) => <Comment comment={c} key={i} />)}
    </List>
  )
}

export default ListComments;