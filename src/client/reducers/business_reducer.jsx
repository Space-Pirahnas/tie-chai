import { SELECTED_YELP_BUSINESS } from '../actions/types.jsx';

export default function(state={}, action) {
  switch(action.type) {
    case SELECTED_YELP_BUSINESS:
      return {...state, selected_business: action.payload}
  }
  return state;
}