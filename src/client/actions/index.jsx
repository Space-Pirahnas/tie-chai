import axios from 'axios';
import fetch from 'isomorphic-fetch';
import { browserHistory } from 'react-router';
import { AUTH_USER, UNAUTH_USER, AUTH_ERROR } from './types.jsx';

const axiosInstance = axios.create({
  baseURL: 'http://e5b70b93.ngrok.io'
});

export function signinUser({ email, password }) {
  console.log("Calling signinUser");
  return function (dispatch) {
    axiosInstance.post('/api/login', {'Email': email, 'Password': password})
    .then(response => {
      console.log("successfully sign in an user and receive token as ", response.body);
      dispatch({ type: AUTH_USER, payload: email });
      // browserHistory.push('/home');
    })
    .catch(error => {
      console.error("fail to sign in an user with error ", error);
      dispatch({ type: AUTH_ERROR, payload: error });
    })
  }
  //   fetch("http://e5b70b93.ngrok.io/api/login", {
  //     method: 'POST',
  //     headers: {
  //       'Accept': 'application/json',
  //       'Content-Type': 'application/json',
  //       'Access-Control-Allow-Origin': '*'
  //     },
  //     // mode: 'no-cors',
  //     Body: {
  //       'Email': email,
  //       'Password': password
  //     }
  //   })
  //   .then(response => {
  //     console.log("successfully sign in an user and receive token as ", response.body);
  //   })
  //   .catch(err => {
  //     console.error("fail to sign in an user with error ", err);
  //   })
  // }
}