import React from 'react';

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
      </div>
    );
  }
};


export default Home;