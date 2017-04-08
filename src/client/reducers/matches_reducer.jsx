import {
  GET_MATCHES
} from '../actions/types.jsx';

export default function(state = [], action) {
  switch(action.type) {
    case GET_MATCHES: 
      return [...state, ...action.payload]
  }
  return state;
}