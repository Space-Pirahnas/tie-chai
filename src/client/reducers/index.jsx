import { combineReducers } from 'redux';
import { reducer as form } from 'redux-form';
import authReducer from './auth_reducer.jsx';
import userInfoReducer from './userInfo_reducer.jsx';
import friendsReducer from './friends_reducer.jsx';


const rootReducer = combineReducers({
  form,
  auth: authReducer,
  userInfo: userInfoReducer,
  friends: friendsReducer
});

export default rootReducer;