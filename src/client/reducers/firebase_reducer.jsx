import {
  INITIALIZE_FIREBASE
} from '../actions/types.jsx';

export default function(state = null, action) {
  switch(action.type) {
    case INITIALIZE_FIREBASE: 
      return action.payload
  }
  return state;
}