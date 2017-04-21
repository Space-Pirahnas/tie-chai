import React, { Component } from 'react';
import * as firebase from 'firebase';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';
import { connect } from 'react-redux';
import * as actions from '../../actions/messages.jsx';
import ChatRoom from './ChatRoom/chatRoom.jsx';

class Message extends Component {
  constructor(props) {
    super(props);
    this.state = {
      messages: [],
      text: ''
    }
    this.submitMessage = this.submitMessage.bind(this);
    this.changeValue = this.changeValue.bind(this);
  }
  componentDidMount() {
    let roomNumber = +this.props.params.roomName + +this.props.params.firstId + +this.props.params.secondId;
    const rootRef = firebase.database().ref();
    const roomRef = rootRef.child(roomNumber);
    roomRef.on("value", entry => {
      this.setState({
        messages: entry.val() || []
      }, () => {
        if (this.state.messages.length === 1) {
          this.props.storeChatRoom(roomNumber, this.props.params.firstId, this.props.params.secondId, this.props.user.Email);
        }
      })
    });
    this.updateScroll();
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
    const rootRef = firebase.database().ref();
    const roomRef = rootRef.child(+this.props.params.roomName + +this.props.params.firstId + +this.props.params.secondId);
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
            <TextField style={{marginTop: "50", width: "80vh"}} hintText="Message" onChange={this.changeValue} value={this.state.text}/>
            <RaisedButton label="Submit" type="submit" primary={true} onClick={this.submitMessage}/>
          </form>
        </div>
      </div>
    );
  }
};

function mapStateToProps(state) {
  return {
    user: state.userInfo.user,
    target: state.target.user
  }
}
export default connect(mapStateToProps, actions)(Message);