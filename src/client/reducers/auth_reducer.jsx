import {
  AUTH_USER,
  UNAUTH_USER,
  AUTH_ERROR,
} from '../actions/types.jsx';

const initialState = {
  email: null,
  authenticated: false
}

export default function(state = initialState, action) {
  switch(action.type) {
    case AUTH_USER:
      return { ...state, error: '', authenticated: true, email: action.payload };
    case UNAUTH_USER:
      return { ...state, authenticated: false, email: null };
    case AUTH_ERROR:
      return { ...state, error: action.payload };
  }

  return state;
}