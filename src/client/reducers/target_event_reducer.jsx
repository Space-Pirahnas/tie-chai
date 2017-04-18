import {
  GET_TARGET_EVENT
} from '../actions/types.jsx';

export default function(state = {}, action) {
  switch(action.type) {
    case GET_TARGET_EVENT: 
      let signed = action.payload.Attendees ? action.payload.Attendees.filter(a => a.Email === action.email).length === 0 : 1;
      return {...state, target: action.payload, rsvp: signed}
  }
  return state;
}