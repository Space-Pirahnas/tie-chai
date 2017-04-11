import React from 'react';
import { connect } from 'react-redux';

import IndexPage from './IndexPage.jsx';
import Nav from './Nav/nav.jsx';
import Logo from './Logo/logo.jsx';
import NavProfile from './Profile/navProfile.jsx';
import Search from './Search/search.jsx';
import Options from './Options/options.jsx';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

class App extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div>
        <header className="Header">
          <Logo />
          {this.props.authenticated ? <Nav /> : null}
          {this.props.authenticated ? <Search /> : null}
          {this.props.authenticated ? <NavProfile /> : null}
          <Options />
        </header>
        <MuiThemeProvider>
          {this.props.children}
        </MuiThemeProvider>
      </div>
    );
  }
};

function mapStateToProps(state) {
  return { authenticated: state.auth.authenticated }
}

export default connect(mapStateToProps)(App);