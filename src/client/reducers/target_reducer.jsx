import {
  GET_TARGET
} from '../actions/types.jsx';

export default function(state = {}, action) {
  switch(action.type) {
    case GET_TARGET: 
      console.log("hiiii im in here", action.payload);
      return {...state, user: action.payload}
  }
  return state;
}