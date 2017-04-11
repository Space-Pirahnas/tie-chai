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
            {this.props.match.Image ? <img className="home_image" src={this.props.match.Image} /> : <img src={"./styles/noprofile.png"} className="home_image"/> }
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