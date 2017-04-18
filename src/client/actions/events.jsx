import axios from 'axios';
import { hashHistory } from 'react-router';
import { GET_EVENTS, GET_TARGET_EVENT } from './types.jsx';
import { axiosInstance } from './index.jsx';

export function getEvents(email) {
  return function (dispatch) {
    axiosInstance.get('/api/create_event', {
      headers: {
        Email: email
      }
    })
      .then(res => {
        dispatch({ type: GET_EVENTS, payload: res.data });
      })
      .catch(err => {
        console.error("unable to retrieve events data ", err);
      });
  }
}

export function postEvents(events) {
  return function (dispatch) {
    axiosInstance.post('/api/create_event', events)
      .then(() => {
        console.log('successfully post events to server /api/create_event');
        hashHistory.push('/home');
      })
      .catch(err => {
        console.log('failt to post events to server /api/create_event', err);
      })
  }
}

// "Jan 2, 2006 at 3:04pm (MST)"
// ["Sun", "Apr", "30", "2017"] ["17:51:32", "GMT-0700", "(PDT)"]

export function translateDateTimeToString(date, time) {
  return function (dispatch) {
    let eventTime = "";
    eventTime += date[1] + ' ' + date[2] + ', ' + date[3];
    const hhmm = time[0].split(':').slice(0, 2);
    const timeTransfer = hhmm[0] > 12 ?
      hhmm[0] - 12 + ":" + hhmm[1] + "pm" :
      hhmm[0] === 12 ? "0:" + hhmm[1] + "am" :
        hhmm[0] + ":" + hhmm[1] + "am";
    eventTime += " at " + timeTransfer + " " + time[2];
    console.log('In the tranlate time  result: ', eventTime);
    return eventTime;
  }
}

export function getTargetEvent(key, email) {
  return function (dispatch) {
    axiosInstance.get('/api/target_event', {
      headers: {
        Key: key
      }
    })
      .then(res => {
        dispatch({ type: GET_TARGET_EVENT, payload: res.data, email: email });
      })
      .catch(err => {
        console.error("unable to retrieve target event ", err);
      });
  }
}

export function rsvpForEvent(email, key) {
  return function(dispatch) {
    axiosInstance.post('/api/rsvp', {
      Email: email,
      Key: key
    })
    .then(res => {
      dispatch(getTargetEvent(key, email));
    })
    .catch(err => {
      console.error("unable to rsvp for event", err);
    })
  }
}

export function deleteRSVP(email, key) {
  return function(dispatch) {
    axiosInstance.delete('/api/rsvp', {
      data: {
        Email: email,
        Key: key
      }
    })
    .then(res => {
      dispatch(getTargetEvent(key, email));
    })
    .catch(err => {
      console.error("unable to rsvp for event", err);
    })
  }
}
