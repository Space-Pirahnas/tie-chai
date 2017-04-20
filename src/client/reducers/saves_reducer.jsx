import {
  GET_SAVED_USERS
} from '../actions/types.jsx';

export default function(state = [], action) {
  switch(action.type) {
    case GET_SAVED_USERS: 
      return action.payload === null ? [] : action.payload;
  }
  return state;
}