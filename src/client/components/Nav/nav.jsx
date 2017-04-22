import React from 'react';
import { Link } from 'react-router';

const Nav = () => (
  <div className="Navigation">
    <nav>
      <ul>
        <li><Link to="/friends">Connections</Link></li>
        <li><Link to="/save">Saved For Later</Link></li>
        <li><Link to="/messenger">Messenger</Link></li>
        <li><Link to="/postevent">Host Event</Link></li>
      </ul>
    </nav>
  </div>
)

export default Nav;