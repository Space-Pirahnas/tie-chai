import React, { Component } from 'react';
import FlatButton from 'material-ui/FlatButton';
import Badge from 'material-ui/Badge';
import { connect } from 'react-redux';
import * as actions from '../../actions/messages.jsx';


class Chat extends Component {
  constructor(props) {
    super(props);
    this.state = {
      messages: [],
      newMessages: 0
    }
    this.findNewMessages = this.findNewMessages.bind(this);
  }

  componentDidMount(){
    const rootRef = this.props.firebaseInstance.ref();
    const roomRef = rootRef.child(this.props.chat.ChatRoom);
    roomRef.on("value", entry => {
      this.setState({
        messages: entry.val() || []
      }, () => {
        this.findNewMessages();
      });
    });
  }

  findNewMessages() {
    let count = 0;
    for (let i = this.state.messages.length - 1; i >= 0; i--) {
      if (!this.state.messages[i] || this.state.messages[i].Email === this.props.user.Email ) {
        break;
      }
      count++;
    }
    this.setState({
      newMessages: count
    });
  }

  render() {
    const messages = this.state.messages;
    return(
      <div>
        <div className="chat_users">
          <img className="chat_user_images" src={this.props.chat.Other.Image || "./styles/noprofile.png"} />
          <div>
            <div className="chats_name">{this.props.chat.Other.Name}</div>
            <div className="chat_last_message">{messages.length ? `${messages[messages.length -1].Name}: ${messages[messages.length - 1].Message}` : null}</div>
          </div>
          <Badge onClick={this.props.viewChatRoom}
            badgeContent={this.state.newMessages}
            secondary={true}
            badgeStyle={{top: 10, right: 10}}
          >
            <i className="fa fa-commenting-o fa-2x" />
          </Badge>
        </div>
      </div>
    )
  }
}

function mapStateToProps(state){
  return {
    user: state.userInfo.user,
    firebaseInstance: state.firebaseInstance
  }
}

export default connect(mapStateToProps, actions)(Chat);