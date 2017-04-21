import axios from 'axios';
import fetch from 'isomorphic-fetch';
import { hashHistory } from 'react-router';
import {
  AUTH_USER, UNAUTH_USER, AUTH_ERROR,
  GET_USER_INFO,
  GET_USER_FRIENDS
} from './types.jsx';

export const axiosInstance = axios.create({
  baseURL: 'http://52.9.55.148:8080/'
});

export function signinUser({ email, password }) {
  return function (dispatch) {
    axiosInstance.post('/api/login', { 'Email': email, 'Password': password })
      .then(response => {
        console.log("successfully sign in an user and receive token as ", response.data);
        dispatch(getUserInfo(response.data, email, true));
        dispatch({ type: AUTH_USER, payload: email });
        localStorage.setItem('token', response.data);
        localStorage.setItem('user_email', email);
      })
      .catch(error => {
        console.error("fail to sign in an user with error ", error);
        dispatch({ type: AUTH_ERROR, payload: true });
      })
  }
}

export function signupUser(signupObj) {
  return function (dispatch) {
    console.log(signupObj, "signup here");
    axiosInstance.post('/api/signup', signupObj)
      .then(response => {
        console.log(signupObj, "signup object hereee", response);
        dispatch({ type: AUTH_USER, payload: signupObj.Email });
        dispatch(getUserInfo(response.data, signupObj.Email, true));
        localStorage.setItem('token', response.data);
        localStorage.setItem('user_email', signupObj.Email);
      })
      .catch(error => {
        console.error("fail to sign in an user with error ", error);
        dispatch({ type: AUTH_ERROR, payload: true });
      })
  }
}

export function signoutUser() {
  localStorage.clear();
  hashHistory.push('/');
  console.log('Sign out user successfully!!!');
  return { type: UNAUTH_USER };

}

export function getUserInfo(token, email, signedUser) {
  return function (dispatch) {
    axiosInstance.get('/api/token', {
      headers: {
        Token: token,
        Email: email
      }
    })
      .then(res => {
        dispatch({ type: AUTH_USER, payload: email });
        dispatch({
          type: GET_USER_INFO, payload: {
            email: email,
            data: res.data,
          }
        })
        if (signedUser) {
          hashHistory.push('/home');
        }
      })
      .catch(err => {
        console.error('Fail to getUserInfo with error ', err);
      })
  }
}

export function getUserFriends(email) {
  return function (dispatch) {
    axiosInstance.get('api/friends', {
      headers: {
        Email: email
      }
    })
      .then(res => {
        dispatch({ type: GET_USER_FRIENDS, payload: res.data });
      })
      .catch(err => {
        console.error('Fail to Fetching friends list with error ', err);
      })
  }
}


