import React, { Component } from 'react';
import * as firebase from 'firebase';

class Message extends Component {
  constructor(props) {
    super(props);
    this.state = {
      messages: []
    }
  }

  componentDidMount() {
    const rootRef = firebase.database().ref();
    const roomRef = rootRef.child("ROOM1");
    let test = [{
      Name: "Testity Test",
      Message: "Hey",
    }, {
      Name: "other tester",
      Message: "Yo what up g",
    }]
    roomRef.set(test);
    roomRef.on("value", entry => {
      this.setState({
        messages: entry.val()
      });
    });
  }

  render () {
    return (
      <h1>Message Page From Message.jsx {JSON.stringify(this.state.messages)}</h1>
    );
  }
};


export default Message;