import axios from 'axios';
import { hashHistory } from 'react-router';
import { axiosInstance } from './index.jsx';
import { getTargetEvent } from './events.jsx';

export function commentEvent (key, email, subject, text ) {
  return function(dispatch) {
    axiosInstance.post('/api/comment', {
      Key: key,
      Email: email,
      Subject: subject,
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