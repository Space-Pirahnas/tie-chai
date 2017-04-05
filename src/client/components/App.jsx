import React from 'react';
import IndexPage from './IndexPage.jsx';
import Nav from './Nav/nav.jsx';
import Logo from './Logo/logo.jsx';
import NavProfile from './Profile/navProfile.jsx';
import Search from './Search/search.jsx';

class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {};
  }

  render() {
    return (
      <div>
        <header className="Header">
          <Logo />
          <Nav />
          <Search />
          <NavProfile />
        </header>
        <div>
          {this.props.children}
        </div>
      </div>
    );
  }
};

export default App;