import React, { Component } from 'react';

class MatchBar extends Component {
  constructor(props) {
    super(props);

  }

  render() {
    return (
      <div>
        <button className="match_button" onClick={this.props.addFriend}>Yes!</button>
        <button className="match_button" onClick={this.props.rejectMatch}>No!</button>
        <button className="match_button">Save!</button>
      </div>
    )
  }
}

export default MatchBar;