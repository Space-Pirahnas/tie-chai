import { SET_ROOM_NUMBER } from '../actions/types.jsx';

export default function(state=0, action) {
  switch(action.type) {
    case SET_ROOM_NUMBER:
      return action.payload
  }
  return state;
}