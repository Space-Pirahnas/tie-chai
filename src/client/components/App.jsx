import React from 'react';
import IndexPage from './IndexPage.jsx';
import Nav from './Nav/nav.jsx';


class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {};
  }

  render() {
    return (
      <div>
        <header className="Header">

          <Nav />

        </header>
        <div>
          {this.props.children}
        </div>
      </div>
    );
  }
};

export default App;