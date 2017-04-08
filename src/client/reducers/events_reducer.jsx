import {
  GET_EVENTS
} from '../actions/types.jsx';

export default function(state = [], action) {
  switch(action.type) {
    case GET_EVENTS: 
      return [...state, ...action.payload]
  }
  return state;
}