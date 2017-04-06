import React from 'react';

class Profile extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      name: 'Veer Gangwal',
      image: '/styles/user.jpeg',
      email: 'checkmytumblr@gmail.com',
      location: 'Chicago, IL',
      interests: ['tumblr', 'UNC', 'Lebron James', 'Mandarin'], 
      biography: 'Hello!'
    }
  }

  render () {
    return (
      <div>
        <div id="hero" className="Hero" style={{ backgroundImage: "url(styles/coffeebackground.jpg)" }}>
          <div className="container">
            <img className="profileImage" src={this.state.image} />
            <div className="Interests">
              <h2>Interests</h2>
              {this.state.interests.map((interest) => 
                <div className="interest Button">{interest}</div>
              )}
            </div>
            <div id="clear"></div>
            <div style={{"margin-left": "50px"}}>
            <div>
              <p>{this.state.name} in {this.state.location}</p>
              <p>{this.state.email}</p>
            </div>
            <div className="button-wrapper" style={{width: "20%"}}>
              <a href="/#/message" className="Button">Message</a>
            </div>
            </div>
          </div>
          <div className="overlay"></div>
        </div>
      </div>
    );
  }
};


export default Profile;