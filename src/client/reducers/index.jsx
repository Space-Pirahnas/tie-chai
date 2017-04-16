import { combineReducers } from 'redux';
import { reducer as form } from 'redux-form';
import authReducer from './auth_reducer.jsx';
import eventReducer from './events_reducer.jsx';
import matchesReducer from './matches_reducer.jsx';
import userInfoReducer from './userInfo_reducer.jsx';
import friendsReducer from './friends_reducer.jsx';
import savesReducer from './saves_reducer.jsx';
import citiesReducer from './cities_reducer.jsx';
import interestsReducer from './interests_reducer.jsx';
import targetReducer from './target_reducer.jsx';
import yelpReducer from './yelp_reducer.jsx';
import businessReducer from './business_reducer.jsx';
import targetEventReducer from './target_event_reducer.jsx';

const rootReducer = combineReducers({
  form,
  auth: authReducer,
  events: eventReducer,
  matches: matchesReducer,
  userInfo: userInfoReducer,
  friends: friendsReducer,
  savedUsers: savesReducer,
  interests: interestsReducer,
  cities: citiesReducer,
  target: targetReducer,
  yelp: yelpReducer,
  business: businessReducer,
  targetEvent: targetEventReducer
});

export default rootReducer;