import React, { Component } from 'react';

export default class SavedUser extends Component {
  constructor(props) {
    super(props)
  }

  render() {
    return (
      <div>
        <div>{this.props.save.Name}</div>
        <div>{this.props.save.Email}</div>
        <div>{this.props.save.Interests.split('-').map((interest, i) => <div key={i}>{interest}</div> )}</div>
        <div>{this.props.save.Company}</div>
        <div>{this.props.save.Bio}</div>
      </div>
    )
  }
}