import { INITIALIZE_FIREBASE } from './types.jsx';

export function firebaseCreator(db) {
  return function(dispatch) {
    dispatch({type: INITIALIZE_FIREBASE, payload: db});
  }
}