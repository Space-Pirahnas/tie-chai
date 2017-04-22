import React, { Component } from 'react';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';
import { connect } from 'react-redux';
import * as actions from '../../../actions/messages.jsx';
import ChatRoom from './ChatRoom/chatRoom.jsx';
import { generateChatRoomName } from '../../../config.jsx';

class Message extends Component {
  constructor(props) {
    super(props);
    this.state = {
      messages: [],
      text: '',
      created: false
    }
    this.submitMessage = this.submitMessage.bind(this);
    this.changeValue = this.changeValue.bind(this);
    this.renderMessages = this.renderMessages.bind(this);
    this.chatDoesntExist = this.chatDoesntExist.bind(this);
    this.renderMessages(props.roomNumber);
  }

  componentWillReceiveProps(props) {
    this.renderMessages(props.roomNumber);
  }

  chatDoesntExist(roomNumber) {
    return this.props.chats ? this.props.chats.map(c => c.ChatRoom).indexOf(roomNumber) < 0 : true;
  }
  
  renderMessages(roomNumber) {
    roomNumber = roomNumber ? roomNumber : this.props.chats && this.props.chats.length ? this.props.chats[0].ChatRoom : 0;
    const rootRef = this.props.firebaseInstance.ref();
    const roomRef = rootRef.child(roomNumber);
    roomRef.on("value", entry => {
      this.setState({
        messages: entry.val() || []
      }, () => {
          if (this.props.friend && this.chatDoesntExist(roomNumber)) {
            this.props.storeChatRoom(roomNumber, this.props.user.ID, this.props.friend.ID, this.props.user.Email);
        }
      });
    });
  }

  componentDidUpdate() {
    this.updateScroll();
  }

  changeValue(text){
    this.setState({
      text: text.target.value
    });
  }

  updateScroll(){
    let messageComponent = document.getElementById("messageComponent");
    messageComponent.scrollTop = messageComponent.scrollHeight;
  }

  submitMessage(e){
    e.preventDefault();
    if (this.state.text) {
      const rootRef = this.props.firebaseInstance.ref();
      const roomRef = rootRef.child(this.props.roomNumber);
      let time = (new Date()).toString();
      let test = {
        Time: time,
        Message: this.state.text,
        Name: this.props.user.Name,
        Email: this.props.user.Email,
        Image: this.props.user.Image,
      }
      roomRef.set([...this.state.messages, test]);
      this.setState({
        text: ''
      });
    }
  }

  render () {
    return (
      <div className="messageContainer">
        <div className="messagePage">
          <div className="messageComponent" id="messageComponent">
            <ChatRoom messages={this.state.messages} user={this.props.user} />
          </div>
        </div>
        <div>
          <form onSubmit={this.submitMessage}>
            <TextField style={{marginTop: "50px", width: "80vh"}} hintText="Message" onChange={this.changeValue} value={this.state.text}/>
            <RaisedButton className="chat_button" label="Submit" type="submit" primary={true} onClick={this.submitMessage}/>
          </form>
        </div>
      </div>
    );
  }
};

function mapStateToProps(state) {
  return {
    user: state.userInfo.user,
    roomNumber: state.roomNumber,
    firebaseInstance: state.firebaseInstance
    // target: state.target.user
  }
}
export default connect(mapStateToProps, actions)(Message);