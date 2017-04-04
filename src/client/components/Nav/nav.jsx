import React from 'react';
import { Link } from 'react-router';

const Nav = () => (
  <div className="navbar navbar-inverse navbar-fixed-left" classID="sidebar-wrapper">
    <div className="Logo">
      <img style={{"max-width": "100%"}}src={"styles/mug.png"} />
      <h2 className="title">Tai-Chai</h2>
    </div>
    <div className="base-navigation">
      <ul className="sidebar-nav">
        <li><Link to="/home">Home</Link></li>
        <li><Link to="/profile/:userid">Profile</Link></li>
        <li><Link to="/friends">Friends</Link></li>
        <li><Link to="/postevent">Create Event</Link></li>
        <li><Link to="/message">Message</Link></li>
      </ul>
    </div>
  </div>
)

export default Nav;