import React from 'react';
import Events from './Events/events.jsx';
import Matches from './Matches/matches.jsx';


class Home extends React.Component {
  constructor(props) {
    super(props);
  }

  render () {
    return (
      <div>
        {/*<div id="hero" className="Hero" style={{ backgroundImage: "url(styles/coffeebackground.jpg)" }}>*/}
        <div> 
          <div className="overlay"></div>
          <div style={{margin: 200}}>
            <Events />
          </div>
          <div>
            <Matches />
          </div>
        </div>
      </div>
    );
  }
};

export default Home;