import axios from 'axios';
import { GET_MATCHES } from './types.jsx';
import { axiosInstance } from './index.jsx';

export function getMatches (email, city) {
  return function (dispatch) {
    axiosInstance.get('/api/users', {
      headers: {
        Email: email,
        City: city
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


