import {
  GET_TARGET
} from '../actions/types.jsx';

export default function(state = {}, action) {
  switch(action.type) {
    case GET_TARGET: 
      console.log("IN HERE", action);
      return {...state, user: action.payload}
  }
  return state;
}