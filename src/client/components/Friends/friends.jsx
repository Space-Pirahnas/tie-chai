import React, { Component } from 'react';
import Friend from './friend.jsx';
import ContactInfo from './contactInfo.jsx';
import { connect } from 'react-redux';
import * as action from '../../actions/index.jsx';


class Friends extends Component {
  constructor(props) {
    super(props);

    this.state = {
      person: null
    }

    this.showFriend = this.showFriend.bind(this)
  }

  componentDidMount() {
    console.log('props in friends: ', this.props);
    this.props.getUserFriends(this.props.email);
  }

  showFriend(friend) {
    console.log('friend: ', friend);
    this.setState({ person: friend });

    console.log("Friends component props.friends ", props);
  }

  render () {
    return (
      <div className="contactList">
        <div className="left">
          <h2 style={{ "margin": "1em auto", "textAlign": "center" }}>Contact List</h2>
          <div className="contacts-container">
            { this.props.friends ? this.props.friends.map((friend) =>  
              <Friend friend={ friend } key={ friend.Email } showFriend={ this.showFriend.bind(this, friend) } />
            ): null }
          </div>
        </div>
        <div className="right">
          {
            this.state.person ? <ContactInfo person={ this.state.person } /> : null
          }
        </div>
      </div>
    );
  }
};

function mapStateToProps(state) {
  console.log('props in friends(state): ', state);
  return { 
    friends: state.friends,
    email: state.auth.email
  };
}

export default connect(mapStateToProps, action)(Friends);
