import React, { Component } from 'react';
import Friend from './friend.jsx';
import ContactInfo from './contactInfo.jsx';
// import { connect } from 'react-redux';
// import * as actions from '../../../actions/index.jsx';

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
  }

  render () {
    return (
      <div className="contactList">
        <div className="left">
          <h2 style={{ "margin": "2em auto" }}>Contact List</h2>
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


export default Friends;

// function mapStateToProps(state) {
//   return { friends: state.}
// }
// export default connect(mapStateToProps, actions)(Friends);