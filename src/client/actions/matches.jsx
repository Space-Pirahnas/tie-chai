import axios from 'axios';
import { hashHistory } from 'react-router';
import { GET_MATCHES } from './types.jsx';
import { axiosInstance } from './index.jsx';

export function getMatches (email, city) {
  return function (dispatch) {
    axiosInstance.get('/api/users', {
      headers: {
        Email: email,
        City: "San Jose - CA"
      }
    })
    .then(res => {
      dispatch({ type: GET_MATCHES, payload: res.data });
    })
    .catch(err => {
      console.error("unable to retrieve events data ", err);
    });
  }
}