import axios from 'axios';
import { GET_MATCHES, GET_TARGET } from './types.jsx';
import { axiosInstance, getUserInfo, getUserFriends } from './index.jsx';
import { getSavedUsers } from './saves.jsx';

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

export function getTarget (userEmail, targetEmail) {
  return function (dispatch) {
    axiosInstance.get('/api/target', {
      headers: {
        User: userEmail,
        Target: targetEmail
      }
    })
    .then(res => {
      dispatch({type: GET_TARGET, payload: res.data});
    })
    .catch(err => {
      console.error("unable to retrieve target data", err);
    });
  }
}


export function resetNotifications(email) {
  return function(dispatch) {
    axiosInstance.post('/api/notification', {
      Email: email
    })
    .then(res => {
      let token = localStorage.getItem("token");
      dispatch(getUserInfo(token, email, false));
    })
    .catch(err => {
      console.error("could not reset notifications", err);
    })
  }
}

export function handleMatch(match, target, path, user) {
  return function(dispatch) {
    // if (this.props.user.verified === "true") {
      let obj = {
        User: {
          Email: user.Email
        }
      };
      obj[target] = {
        Email: match.Email
      };
      axiosInstance.post(path, obj)
                  .then(res => {
                    let token = localStorage.getItem("token");
                    dispatch(getMatches(user.Email, user.City));
                    dispatch(getUserInfo(token, user.Email, false));
                    dispatch(getSavedUsers(user.Email));
                  })
                  .catch(err => {
                    console.error(`cound not ${target} friend`, err);
                  });
    // }

  }
}

export function deleteFriend(user, friend) {
  return function (dispatch) {
    axiosInstance.delete('/api/friends', {
      data: { 
        User: {
          Email: user.Email
        },
        Friend: {
          Email: friend.Email
        }
      }
    })
    .then(res => {
      dispatch(getUserFriends(user.Email));
    })
    .catch(err => {
      console.error("unable to delete friend", err);
    });
  }
}