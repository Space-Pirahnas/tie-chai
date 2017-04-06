import axios from 'axios';
import fetch from 'isomorphic-fetch';
import { hashHistory } from 'react-router';
import { AUTH_USER, UNAUTH_USER, AUTH_ERROR } from './types.jsx';

const axiosInstance = axios.create({
  baseURL: 'http://e5b70b93.ngrok.io'
});

export function signinUser({ email, password }) {
  console.log("Calling signinUser");
  return function (dispatch) {
    axiosInstance.post('/api/login', { 'Email': email, 'Password': password })
      .then(response => {
        console.log("successfully sign in an user and receive token as ", response.data);
        dispatch({ type: AUTH_USER, payload: email });
        hashHistory.push('/home');
      })
      .catch(error => {
        console.error("fail to sign in an user with error ", error);
        dispatch({ type: AUTH_ERROR, payload: error });
      })
  }
}

export function signupUser(signupObj) {
  console.log("Calling signupUser", signupObj);
  return function (dispatch) {
    axiosInstance.post('/api/signup', signupObj)
      .then(response => {
        console.log("successfully sign up an user and receive token as ", response.data);
        dispatch({ type: AUTH_USER, payload: signupObj.email });
        hashHistory.push('/home');
      })
      .catch(error => {
        console.error("fail to sign in an user with error ", error);
        dispatch({ type: AUTH_ERROR, payload: error });
      })
  }
}

export function getUser(token) {
  return function(dispatch) {
    dispatch({type: AUTH_USER})
    axios.get('/api/user', {
      headers: {
        authorization: token
      }
    })
    .then(res => {
      // const { email } = res.data
      // dispatch({ type: AUTH_USER, payload: email });
      // dispatch(getFavorites(username))
    })
  }
}