import React, { Component } from 'react';
import * as actions from '../../actions/messages.jsx';
import { connect } from 'react-redux';
import Chat from './chat.jsx';
import { hashHistory } from 'react-router';


class Chats extends Component {
  constructor(props) {
    super(props);
  }

  componentWillMount(){
    this.props.getChatRooms(this.props.user.Email);
  }

  viewChatRoom(chat){
    let room = chat.ChatRoom - chat.User.ID - chat.Other.ID;
    let sorted = [chat.User.ID, chat.Other.ID].sort();
    hashHistory.push(`/message/${room}/${sorted[0]}/${sorted[1]}`);
  }

  render(){
    return(
      <div>
        {this.props.chats ? this.props.chats.map((c, i) => <Chat viewChatRoom={this.viewChatRoom.bind(this, c)}chat={c} key={i} />) : null}
      </div>
    )
  }
}

function mapStateToProps(state) {
  return {
    user: state.userInfo.user,
    chats: state.chats
  }
} 

export default connect(mapStateToProps, actions)(Chats);