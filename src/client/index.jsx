import { Router, Route, IndexRoute, hashHistory } from 'react-router';
import ReactDOM from 'react-dom';
import React from 'react';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import reducers from './reducers/index.jsx';
import App from './components/App.jsx';
import IndexPage from './components/IndexPage.jsx';
import SignIn from './components/Auth/SignIn/signin.jsx';
import SignUp from './components/Auth/SignUp/signup.jsx';
import SignOut from './components/Auth/SignOut/signout.jsx';
import Home from './components/Home/home.jsx';
import Friends from './components/Friends/friends.jsx';
import CreateEvent from './components/Event/event.jsx';
import Profile from './components/Profile/profile.jsx';
import Chats from './components/Chats/chats.jsx';
import Nav from './components/Nav/nav.jsx';
import Save from './components/Save/save.jsx'
import checkAuth from './components/Auth/check_auth.jsx';
import { getUserInfo } from './actions/index.jsx';
import { getInterests, getCities } from './actions/interests.jsx';
import { firebaseCreator } from './actions/firebase.jsx';
import eventView from './components/EventView/eventView.jsx';
import { FIREBASE_CONFIG } from './config.jsx';
import * as firebase from 'firebase';

const store = createStore(reducers,
  applyMiddleware(thunk));
window.store = store;

const token = localStorage.getItem('token');
const email = localStorage.getItem('user_email');

if (token && email) {
  store.dispatch(getUserInfo(token, email, false))
}

function initializeFirebase() {
  firebase.initializeApp(FIREBASE_CONFIG);
  let db = firebase.database();
  store.dispatch(firebaseCreator(db));
};

initializeFirebase();

store.dispatch(getInterests());
store.dispatch(getCities());

ReactDOM.render(
  <div className="container-fluid">
    <Provider store={store}>
      <Router history={hashHistory} >
        <Route path='/' component={App} >
          <IndexRoute component={IndexPage} />
          <Route path='/auth/signup' component={SignUp} />
          <Route path='/auth/signin' component={SignIn} />
          <Route path='/auth/signout' component={SignOut} />
          <Route path='/home' component={checkAuth(Home)} />
          <Route path='/friends' component={Friends} />
          <Route path='/postevent' component={checkAuth(CreateEvent)} />
          <Route path='/events/:eventID' component={checkAuth(eventView)} />
          <Route path='/profile/:userEmail' component={checkAuth(Profile)} />
          <Route path='/save' component={checkAuth(Save)} />
          <Route path='/messenger' component={checkAuth(Chats)} />
        </Route>
      </Router>
    </Provider>
  </div>
  , document.getElementById('app'));
