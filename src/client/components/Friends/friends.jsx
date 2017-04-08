import React, { Component } from 'react';
import Friend from './friend.jsx';
import ContactInfo from './contactInfo.jsx';
import React from 'react';
import { connect } from 'react-redux';
import * as action from '../../actions/index.jsx';

const friends = [
  {
    name: 'Veer Gangwal',
    location: 'Chicago',
    image: '/styles/user.jpg',
    email: 'veer.@gmail.com',
    interests: ['basketball', 'music', 'JS']
  },
  {
    name: 'Summer',
    location: 'Dublin',
    image: '/styles/user.jpg',
    email: 'summer@gmail.com',
    interests: ['Dancing', 'Ryan']
  },
  {
    name: 'Daryll',
    location: 'Hong Kong',
    image: '/styles/user.jpeg',
    email: 'daryll@gmail.com',
    interests: ['basketball', 'Food', 'Costco']
  },
  {
    name: 'Felix',
    location: 'San Francisco',
    image: '/styles/user.jpeg',
    email: 'felix@gmail.com',
    interests: ['golang', 'coding', 'programming']
  },
]

class Friends extends Component {
  constructor(props) {
    super(props);

    this.state = {
      person: friends[0]
    }

    this.showFriend = this.showFriend.bind(this)
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
          <h2 style={{ "margin": "2em auto", "text-align": "center" }}>Contact List</h2>
          <div className="contacts-container">
            { friends.map((friend) =>  
              <Friend friend={ friend } key={ friend.email } showFriend={ this.showFriend } person={ this.state.person }/>
            )}
          </div>
        </div>
        <div className="right">
          <ContactInfo person={ this.state.person } />
        </div>
      </div>
    );
  }
};

function mapStateToProps(state) {
  return { friends: state.friends.data};
}

export default connect(mapStateToProps, action)(Friends);
