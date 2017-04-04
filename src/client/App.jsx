import React from 'react';
import IndexPage from './components/IndexPage.jsx';
import Nav from './components/Nav/nav.jsx';

class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {};
  }

  render () {
    return (
       <div className ="row">
          <div className="col-xs-2 col-sm-2 col-md-2 col-lg-2">
            <Nav />
          </div>
        <div className="col-xs-10 col-sm-10 col-md-10 col-lg-10">
          {this.props.children}
        </div>
      </div>
    );
  }
};

export default App;