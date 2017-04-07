import { combineReducers } from 'redux';
import { reducer as form } from 'redux-form';
import authReducer from './auth_reducer.jsx';
import eventReducer from './events_reducer.jsx';

const rootReducer = combineReducers({
  form,
  auth: authReducer,
  event: eventReducer
});

export default rootReducer;