import React from 'react';
import timeago from 'timeago.js';

const ChatRoomMessage = ({ message, user }) => {
  const isUser = message.Email === user.Email;
  const time = timeago().format(Date.parse(message.Time));
  message.Image = message.Image ? `http:${message.Image.slice(5)}` : "./styles/noprofile.png";
  if (isUser) {
    return (
      <div style={{marginBottom: "2vh"}}>
        <div className="chat_message" style={{ justifyContent: "flex-end" }}>
          <div className="chat_bubble_user">
            <div className="chat_message_message">{message.Message}</div>
            <img className="chat_image" src={message.Image} />
          </div>
        </div>
        <div className="chat_message_text_user">{message.Name} - {time}</div>
      </div>
    )
  } else {
    return (
      <div style={{marginBottom: "2vh"}}>
        <div className="chat_message" style={{ justifyContent:"flex-start" }}>
          <div className="chat_bubble">
            <img className="chat_image" src={message.Image} />
            <div className="chat_message_message">{message.Message}</div>
          </div>
        </div>
        <div className="chat_message_text">{message.Name} - {time}</div>
      </div>
    )
  }
}

export default ChatRoomMessage;