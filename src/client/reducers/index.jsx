import { combineReducers } from 'redux';
import { reducer as form } from 'redux-form';
import authReducer from './auth_reducer.jsx';
import eventReducer from './events_reducer.jsx';
import matchesReducer from './matches_reducer.jsx';

const rootReducer = combineReducers({
  form,
  auth: authReducer,
  events: eventReducer,
  matches: matchesReducer
});

export default rootReducer;