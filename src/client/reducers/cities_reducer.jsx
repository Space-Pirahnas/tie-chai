import {
  GET_CITIES
} from '../actions/types.jsx';

export default function(state = [], action) {
  switch(action.type) {
    case GET_CITIES: 
      return action.payload
  }
  return state;
}