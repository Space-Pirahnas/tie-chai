import axios from 'axios';
import { GET_INTERESTS, GET_CITIES } from './types.jsx';
import { axiosInstance } from './index.jsx';

export function getInterests () {
  return function (dispatch) {
    axiosInstance.get('/api/interests')
    .then(res => {
      dispatch({ type: GET_INTERESTS, payload: res.data });
    })
    .catch(err => {
      console.error("unable to retrieve interests data ", err);
    });
  }
}

export function getCities () {
  return function (dispatch) {
    axiosInstance.get('/api/cities')
    .then(res => {
      dispatch({ type: GET_CITIES, payload: res.data });
    })
    .catch(err => {
      console.error("unable to retrieve cities data ", err);
    });
  }
}

