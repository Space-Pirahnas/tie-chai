import React from 'react';

const Friend = (props) => {
  const imageStyles = {
    backgroundImage: "url(" + props.friend.image + ")"
  }
  const contactStyles = {
    backgroundColor: props.person === props.friend ? "#337ab7" : ""
  }

  return (
    <div className="contact" onClick={ () => props.showFriend(props.friend) } style={ contactStyles }>
      <span className="image" style={ imageStyles }></span>
      <span className="name" >{ props.friend.name }</span>
    </div>
  )
}

export default Friend;