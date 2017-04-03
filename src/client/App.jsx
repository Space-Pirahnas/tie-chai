import React from 'react';
import IndexPage from './components/IndexPage.jsx';

class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {};
  }

  render () {
    return (
      <div>Hello world what up lol From App.jsx 
        {this.props.children}
      </div>
    );
  }
};

export default App;