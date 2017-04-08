import { GET_USER_FRIENDS } from '../actions/types.jsx';

const initialState = [];

export default function(state=initialState, action) {
  switch(action.type) {
    case GET_USER_FRIENDS:
      return [...state, action.payload.data]
    default:
      return state;
  }
}