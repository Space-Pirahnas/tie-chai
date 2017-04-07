import React, { Component } from 'react';
import Friend from './friend.jsx';
import ContactInfo from './contactInfo.jsx';
import { connect } from 'react-redux';
import * as actions from '../../../actions/index.jsx';

class Friends extends Component {
  constructor(props) {
    super(props);

    this.state = {
      person: friends[0]
    }

    this.showFriend = this.showFriend.bind(this)
  }

  showFriend(e) {
    this.setState({ person: e.target.value });
  }

  render () {
    return (
      <div>
        <div className="left">
          <h2>Contact</h2>
          <div className="contacts-container">
            { this.props.friends(friend => 
              <Friend friend={ friend } showFriend={ this.showFriend } person={ this.state.person }/>
            )}
          </div>
        </div>
        <div className="right">
          <ContactInfo person={this.state.person} />
        </div>
      </div>
    );
  }
};

function mapStateToProps(state) {
  return { friends: state.}
}

export default connect(mapStateToProps, actions)(Friends);