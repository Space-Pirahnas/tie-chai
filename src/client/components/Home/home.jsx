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
          <div className="home">
            <div>
              <h1>Events!</h1>
              <Events />
            </div>
            <div>
              <h1>Today's Matches!</h1>
              <Matches />
            </div>
          </div>
        </div>
      </div>
    );
  }
};

export default Home;