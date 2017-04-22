import axios from 'axios';
import { hashHistory } from 'react-router';
import { axiosInstance } from './index.jsx';
import { getTargetEvent } from './events.jsx';

export function commentEvent (key, email, text ) {
  return function(dispatch) {
    axiosInstance.post('/api/comment', {
      Key: key,
      Email: email,
      Text: text,
      CreatedAt: (new Date()).toString()
    })
    .then(res => {
      dispatch(getTargetEvent(key, email));
    })
    .catch(err =>{
      console.error("could not post comment", err);
    })
  }
}
export function deleteCommentEvent (key, email, text, createdAt ) {
  return function(dispatch) {
    axiosInstance.delete('/api/comment', {
      data: {
        Key: key,
        Email: email,
        Text: text,
        CreatedAt: createdAt
      }
    })
    .then(res => {
      dispatch(getTargetEvent(key, email));
    })
    .catch(err =>{
      console.error("could not delete comment", err);
    })
  }
}