import {
  GET_TARGET_EVENT
} from '../actions/types.jsx';

export default function(state = {}, action) {
  switch(action.type) {
    case GET_TARGET_EVENT: 
      return {...state, target: action.payload}
  }
  return state;
}