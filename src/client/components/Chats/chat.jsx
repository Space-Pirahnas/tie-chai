import React from 'react';
import FlatButton from 'material-ui/FlatButton';


export default function (props) {
  return(
    <div style={{margin: 200}}>
      <FlatButton label={props.chat.Other.Name} onClick={props.viewChatRoom} />
    </div>
  )
}