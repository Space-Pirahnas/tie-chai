import React from 'react';
import { connect } from 'react-redux'
import * as actions from '../../actions/index.jsx';

class Profile extends React.Component {
  constructor(props) {
    super(props);

    this.state={
      mounted: false
    }
    this.fetchUser = this.fetchUser.bind(this);
  }

  componentDidMount() {
    this.fetchUser();
  }

  fetchUser() {
    this.props.getUserInfo(this.props.email);
  }

  render () {
    console.log('props inside profile ', this.props);
    return (
      <div>
        <div id="hero" className="Hero" style={{ backgroundImage: "url(styles/coffeebackground.jpg)" }}>
          <div className="container">
            <img className="profileImage" src={this.props.image} />
            <div className="Interests">
              <h2>Interests</h2>
              {this.props.interests.map((interest) => 
                <div className="interest Button">{interest}</div>
              )}
            </div>
            <div id="clear"></div>
            <div style={{"margin-left": "50px"}}>
            <div>
              <p>{this.props.name} in {this.props.city}</p>
              <p>{this.props.email}</p>
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

function mapStateToProps(state) {
  console.log('state in profile: ', state);
  return { 
    token: state.token,
    email: state.auth.email,
    image: state.image,
    name: state.name,
    interest: state.interests,
    city: state.city
  }
}

export default connect(mapStateToProps, actions)(Profile);