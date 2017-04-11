import { combineReducers } from 'redux';
import { reducer as form } from 'redux-form';
import authReducer from './auth_reducer.jsx';
import eventReducer from './events_reducer.jsx';
import matchesReducer from './matches_reducer.jsx';
import userInfoReducer from './userInfo_reducer.jsx';
import friendsReducer from './friends_reducer.jsx';
import savesReducer from './saves_reducer.jsx';

const rootReducer = combineReducers({
  form,
  auth: authReducer,
  events: eventReducer,
  matches: matchesReducer,
  userInfo: userInfoReducer,
  friends: friendsReducer,
});

export default rootReducer;