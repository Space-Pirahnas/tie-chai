import {
  GET_INTERESTS
} from '../actions/types.jsx';

export default function(state = [], action) {
  switch(action.type) {
    case GET_INTERESTS: 
      return action.payload
  }
  return state;
}