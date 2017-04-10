import axios from 'axios';
import { hashHistory } from 'react-router';
import { GET_SAVED_USERS } from './types.jsx';
import { axiosInstance } from './index.jsx';

export function getSavedUsers(email){
  return function(dispatch) {
    axiosInstance.get('/api/save', {
      headers: {
        Email: email
      }
    })
    .then(res => {
      dispatch({type: GET_SAVED_USERS, payload: res.data});
    });
  }
}