import { GET_CHAT_ROOMS } from '../actions/types.jsx';

export default function(state=[], action) {
  switch(action.type) {
    case GET_CHAT_ROOMS:
      return action.payload
  }
  return state;
}