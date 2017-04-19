import React, { Component } from 'react';
import * as firebase from 'firebase';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';
import { connect } from 'react-redux';
import * as actions from '../../actions/messages.jsx';

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
  }

  changeValue(text){
    this.setState({
      text: text.target.value
    });
  }

  submitMessage(){
    const rootRef = firebase.database().ref();
    const roomRef = rootRef.child(+this.props.params.roomName + +this.props.params.firstId + +this.props.params.secondId);
    let time = (new Date()).toString();
    let test = {
      Time: time,
      Message: this.state.text,
      Name: this.props.user.Name,
      Email: this.props.user.Email,
    }
    roomRef.set([...this.state.messages, test]);
    this.setState({
      text: ''
    });
  }

  render () {
    return (
      <div style={{marginTop: 200}}>
        <h1>Message Page From Message.jsx {JSON.stringify(this.state.messages)}</h1>
        <TextField hintText="Message" onChange={this.changeValue} value={this.state.text}/>
        <RaisedButton label="Submit" primary={true} onClick={this.submitMessage}/>
      </div>
    );
  }
};

function mapStateToProps(state) {
  return {
    user: state.userInfo.user
  }
}
export default connect(mapStateToProps, actions)(Message);