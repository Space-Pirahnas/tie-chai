import React from 'react';
import { connect } from 'react-redux';

import IndexPage from './IndexPage.jsx';
import Nav from './Nav/nav.jsx';
import Logo from './Logo/logo.jsx';
import NavProfile from './Profile/navProfile.jsx';
import Search from './Search/search.jsx';
import Options from './Options/options.jsx';

class App extends React.Component {
  constructor(props) {
    super(props);

    console.log("In the App.jsx, the props.authenticated is ", props.authenticated);
  }

  render() {
    console.log("In the App.jsx render function, the props.authenticated is ", this.props.authenticated);
    return (
      <div>
        <header className="Header">
          <Logo />
          {this.props.authenticated ? <Nav /> : null}
          {this.props.authenticated ? <Search /> : null}
          {this.props.authenticated ? <NavProfile /> : null}
          <Options />
        </header>
        <div>
          {this.props.children}
        </div>
      </div>
    );
  }
};

function mapStateToProps(state) {
  return { authenticated: state.auth.authenticated }
}

export default connect(mapStateToProps)(App);