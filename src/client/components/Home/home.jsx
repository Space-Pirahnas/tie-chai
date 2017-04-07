import React from 'react';
// import Events from './Events/events.jsx';
// import Matches from './Matches/matches.jsx';

// rendering events and match_list

class Home extends React.Component {
  constructor(props) {
    super(props);
  }

  render () {
    return (
      <div>
        <div id="hero" className="Hero" style={{ backgroundImage: "url(styles/coffeebackground.jpg)" }}>
          <div className="overlay"></div>
        </div>
{/*        <Events />
        <Matches />*/}
      </div>
    );
  }
};

export default Home;