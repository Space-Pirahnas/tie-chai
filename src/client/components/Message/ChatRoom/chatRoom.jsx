import React, { Component } from 'react';
import ChatRoomMessage from './chatRoomMessage.jsx';

class ChatRoom extends Component {
  constructor(props) {
    super(props);
  }


  render(){
    return(
      <div>
        {this.props.messages.map((message, i) => <ChatRoomMessage user={this.props.user} message={message} key={i} />)}
      </div>
    )
  }
}

export default ChatRoom;