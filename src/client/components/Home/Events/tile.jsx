import React, { Component } from 'react';
import GridTile from './GridTile.js';

export default class Tile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      hover: false
    }
    this.mouseOver = this.mouseOver.bind(this);
  }

  mouseOver() {
    this.setState( {
      hover: !this.state.hover
    });
  }

  render() {
    return (
      <GridTile
      className="event"
      title={this.props.event.Title}
      subtitle={this.state.hover ? <div>{`${this.props.event.Location} on ${this.props.event.Date}`}</div> : <div>{`hosted by ${this.props.event.Owner}`}</div>}
      subtitleStyle={{ 'display': 'flex', 'flexFlow': 'row wrap', 'whiteSpace': 'wrap', }}
      titleBackground="linear-gradient(to bottom, rgba(0,0,0,0.7) 0%,rgba(0,0,0,0.3) 70%,rgba(0,0,0,0) 100%)"
      onMouseEnter={this.mouseOver}
      onMouseLeave={this.mouseOver}
      onClick={this.props.viewEvent}
      >
        <img src={this.props.event.Image} width={220} />
      </ GridTile>
    )
  }
}