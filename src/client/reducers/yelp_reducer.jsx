import { GET_YELP_BUSINESS } from '../actions/types.jsx';

export default function(state=[], action) {
  switch(action.type) {
    case GET_YELP_BUSINESS:
      return {...state, businesses: action.payload}
  }
  return state;
}