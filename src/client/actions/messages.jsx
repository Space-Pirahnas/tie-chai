import { axiosInstance, getUserInfo } from './index.jsx';
import { GET_CHAT_ROOMS, SET_ROOM_NUMBER } from './types.jsx';

export function storeChatRoom(roomNumber, firstId, secondId, email) {
  return function(dispatch) {
    axiosInstance.post('/api/chatroom', {
      FirstId: +firstId,
      SecondId: +secondId,
      RoomNumber: +roomNumber
    })
    .then(res => {
      let token = localStorage.getItem("token");
      dispatch(getUserInfo(token, email, false));
      dispatch(getChatRooms(email));
    })
    .catch(err => {
      console.error("could not add room", err);
    });
  }
}

export function getChatRooms(email) {
  return function(dispatch) {
    axiosInstance.get('/api/chatroom', {
      headers: {
        Email: email
      }
    })
    .then(res => {
      dispatch({ type: GET_CHAT_ROOMS, payload: res.data });
    })
    .catch(err => {
      console.error("could not add room", err);
    });
  }
}

export function setChatRoomNumber(roomNumber) {
  return function(dispatch) {
    dispatch({ type: SET_ROOM_NUMBER, payload: roomNumber});
  }
}

