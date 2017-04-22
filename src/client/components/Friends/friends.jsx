import React, { Component } from 'react';
import Friend from './friend.jsx';
import ContactInfo from './contactInfo.jsx';
import { connect } from 'react-redux';
import * as action from '../../actions/index.jsx';
import FriendCard from './friendCard.jsx';


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
  }

  render() {
    const cb = (a, b) => {
      if (a.Name < b.Name) {
        return -1;
      } else {
        return 1;
      }
    }

    return (
      <div className="background" style={{ backgroundImage: "url(styles/tweed.png)" }}>
        <div className="contactList">
          {this.props.friends ? this.props.friends.sort(cb).map((friend) =>
            <FriendCard friend={friend} key={friend.Email} showFriend={this.showFriend.bind(this, friend)} />
          ) :
            <div className="saveDefaultBackground" >
              <img src="styles/pepe.png" />
              <p>Empty</p>
            </div>
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
