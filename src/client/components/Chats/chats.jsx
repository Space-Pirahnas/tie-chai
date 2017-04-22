import React, { Component } from 'react';
import * as messageActions from '../../actions/messages.jsx';
import { getUserFriends } from '../../actions/index.jsx';
import { connect } from 'react-redux';
import Chat from './chat.jsx';
import { hashHistory } from 'react-router';
import Message from './Message/message.jsx';
import FlatButton from 'material-ui/FlatButton';
import { generateChatRoomName } from '../../config.jsx';
import AppBar from 'material-ui/AppBar';
import { cyan400 } from 'material-ui/styles/colors';

class Chats extends Component {
  constructor(props) {
    super(props);
    this.state = {
      roomNumber: 0
    }
  }

  componentWillMount(){
    this.props.getChatRooms(this.props.user.Email);
    this.props.getUserFriends(this.props.user.Email);
  }

  viewChatRoom(chat){
    this.props.setChatRoomNumber(chat.ChatRoom);
  }

  makeFriendChat(friend) {
    let roomNumber = generateChatRoomName(friend.Email, this.props.user.Email);
    this.setState({
      friend: friend
    });
    this.props.setChatRoomNumber(roomNumber);
  }


  render(){
    const cb = (i) => {
      return this.props.chats ? this.props.chats.map(v => v.Other.Email).indexOf(i.Email) < 0 : true;
    };
    return(
      <div className="chats_page">
        <div className="chats_list">
          <AppBar style={{backgroundColor: cyan400}} className="chat_bar" title="Chat History" showMenuIconButton={false} />
          {this.props.chats && this.props.chats.length ? this.props.chats.map((c, i) => <Chat user={this.props.user} viewChatRoom={this.viewChatRoom.bind(this, c)} chat={c} key={i} />) : null}
          <AppBar style={{backgroundColor: cyan400}} className="chat_bar" title="Friends List" showMenuIconButton={false} />
          {this.props.friends && this.props.friends.length ? this.props.friends.filter(cb).map((friend, i) => <FlatButton key={i} label={friend.Name} onClick={this.makeFriendChat.bind(this,friend)} />) :null}
        </div>
        <Message friend={this.state.friend} chats={this.props.chats} />
      </div>)
    } 
  }

function mapStateToProps(state) {
  return {
    user: state.userInfo.user,
    chats: state.chats,
    roomNumber: state.roomNumber,
    friends: state.friends
  }
} 

export default connect(mapStateToProps, {...messageActions, getUserFriends })(Chats);