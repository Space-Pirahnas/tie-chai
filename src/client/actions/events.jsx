import axios from 'axios';
import { hashHistory } from 'react-router';
import { GET_EVENTS } from './types.jsx';
import { axiosInstance } from './index.jsx';

export function getEvents (email) {
  return function (dispatch) {
    axiosInstance.get('/api/create_event', {
      headers: {
        Email: email
      }
    })
    .then(res => {
      dispatch({ type: GET_EVENTS , payload: res.data });
    })
    .catch(err => {
      console.error("unable to retrieve events data ", err);
    });
  }
}

export function postEvents(events) {
  return function (dispatch) {
    axiosInstance.post('/api/create_event', events)
    .then(()=> {
      console.log('successfully post events to server /api/create_event');
    })
    .catch(err => {
      console.log('failt to post events to server /api/create_event', err);
    })
  }
}