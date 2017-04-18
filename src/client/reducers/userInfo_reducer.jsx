import { GET_USER_INFO } from '../actions/types.jsx';
import formatResponse from '../components/Util/helpers.jsx';

const initialState = {};

export default function(state=initialState, action) {
  switch(action.type) {
    case GET_USER_INFO:
      let user = formatResponse(action.payload.data.Profile);
      console.log(user, "INSIDE REDUCER HERE");
      return {...state, user: user};
    default:
      return state;
  }
}