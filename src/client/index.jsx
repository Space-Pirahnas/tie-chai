import { Router, Route, IndexRoute, hashHistory } from 'react-router';
import ReactDOM from 'react-dom';
import React from 'react';
import App from './App.jsx';
import IndexPage from './components/IndexPage.jsx';
import SignIn from './components/SignIn/signin.jsx';
import SignUp from './components/SignUp/signup.jsx';
import Home from './components/Home/home.jsx';
import Friends from './components/Friends/friends.jsx';
import CreateEvent from './components/Event/event.jsx';
import Profile from './components/Profile/profile.jsx';
import Message from './components/Message/message.jsx';

ReactDOM.render(
  <Router history={hashHistory} >
    <Route path='/' component={App} >
      <IndexRoute component={IndexPage} />
      <Route path='/auth/signup' component={SignUp} />
      <Route path='/auth/signin' component={SignIn} />
      <Route path='/home' component={Home} />
      <Route path='/friends' component={Friends} />
      <Route path='/postevent' component={CreateEvent} />
      <Route path='/profile/:userid' component={Profile} />
      <Route path='/message' component={Message} />
    </Route>
  </Router>
, document.getElementById('app'));
