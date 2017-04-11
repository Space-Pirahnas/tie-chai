import React, { Component } from 'react';

class MatchBar extends Component {
  constructor(props) {
    super(props);

  }

  render() {
    return (
      <div className="match_button_bar" >
        <input type= "image" onClick={this.props.addFriend} src={"./styles/tick-inside-circle.svg"} className="match_button" />
        <input type= "image" onClick={this.props.rejectMatch} src={"./styles/delete-button.svg"} className="match_button" />
        <input type= "image" onClick={this.props.saveMatch} src={"./styles/save-file.svg"} className="match_button" />
      </div>
    )
  }
}

export default MatchBar;