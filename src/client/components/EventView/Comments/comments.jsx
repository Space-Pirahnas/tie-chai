import React from 'react';
import Comment from './comment.jsx';
import { List } from 'material-ui/List';
import Subheader from 'material-ui/Subheader';
import Divider from 'material-ui/Divider';

const ListComments = (props) => {
  const comments = props.comments;
  return (
    <div>
      <Divider />
      <List>
        <Subheader>{`${comments.length} Comments`}</Subheader>
        {comments.map((c, i) => <Comment comment={c} key={i} />)}
      </List>
    </div>
  )
}

export default ListComments;