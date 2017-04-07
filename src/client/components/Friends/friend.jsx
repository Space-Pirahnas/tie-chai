import React from 'react';

const Friend = (props) => {
  const imageStyles = {
    backgroundImage: "url(" + this.props.friend.image + ")"
  }
  const contactStyles = {
    backgroundColor: this.props.person === this.props.friend ? "#46733E" : ""
  }

  return (
    <div className="contact" onClick={ this.props.showFriend(e) } style={ contactStyles }>
      <span className="image" style={ imageStyles }></span>
      <span className="name">{ this.props.friend.name }></span>
    </div>
  )
}

export default Friend;