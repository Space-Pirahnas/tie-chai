import { combineReducers } from 'redux';
import { reducer as form } from 'redux-form';
import authReducer from './auth_reducer.jsx';
import userInfoReducer from './userInfo_reducer.jsx';


const rootReducer = combineReducers({
  form,
  auth: authReducer,
  userInfo: userInfoReducer
});

export default rootReducer;