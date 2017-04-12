import React, { Component } from 'react';
import MatchBar from './matchbar.jsx';

class Match extends Component {
  constructor(props) {
    super(props);

  }

  render() {
    return (
      <div className="match_container">
        <div className="match">
          <div className="home_match">
            {this.props.match.Image ? <input type="image" className="home_image" src={this.props.match.Image} onClick={this.props.viewMatch}/> : <input type="image" src={"./styles/noprofile.png"} className="home_image" onClick={this.props.viewMatch}/> }
            <div>
              <div className="home_name">{this.props.match.Name}</div>
              <div>{this.props.match.City}</div>
              <div className="home_match">
                {this.props.match ? this.props.match.Interests.split('-').map((interest,i) => <div className="interests" key={i}>{interest}</div>) : null}
              </div>
            </div>
          </div>
        </div>
        <MatchBar addFriend={this.props.addFriend} rejectMatch={this.props.rejectMatch} saveMatch={this.props.saveMatch} />
      </div>
    )
  }
}

export default Match;