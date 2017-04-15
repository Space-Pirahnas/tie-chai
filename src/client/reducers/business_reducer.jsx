import { SELECTED_YELP_BUSINESS } from '../actions/types.jsx';

export default function(state={}, action) {
  console.log('selected yelp business dispatched , the action ', action.type, action.payload)
  switch(action.type) {
    case SELECTED_YELP_BUSINESS:
      return {...state, selected_business: action.payload}
  }
  return state;
}