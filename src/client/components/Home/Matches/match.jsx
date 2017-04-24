import React, { Component } from 'react';
import MatchBar from './matchbar.jsx';
import { Rating } from 'material-ui-rating';
import { Card, CardActions, CardHeader, CardMedia, CardTitle, CardText } from 'material-ui/Card';
import FlatButton from 'material-ui/FlatButton';
import Toggle from 'material-ui/Toggle';

class Match extends Component {
  constructor(props) {
    super(props);

    this.state = {
      expanded: false
    }
  }

  render() {
    let userInterests = this.props.user.Interests.split('-');
    return (
      <div className="matchCard" style={{ backgroundImage: "url(styles/creampaper.png)" }}>
        <div className="matchProfile">
          {
            this.props.match.Image ? <input type="image" onClick={this.props.viewMatch} className="matchImage" src={this.props.match.Image} /> : <input onClick={this.props.viewMatch} type="image" className="matchImage" src={"./styles/noprofile.png"} />
          }
          <div className="matchName" >
            {this.props.match.Name}
          </div>
          <div className="matchCity" >
            { this.props.match.City }
          </div>
        </div>
        <div className="matchInfo">
          <div className="matchCareer">
            <div className="matchProfession">
              {this.props.match.Profession}
            </div>
            <div className="matchCompany">
              {`@ ${ this.props.match.Company }`}
            </div>
          </div>
          <div className="matchInterests">
            {this.props.match ? this.props.match.Interests.split('-').sort((a, b) => userInterests.indexOf(a) > -1 ? -1 : 1).map((interest, i) => <div className={userInterests.indexOf(interest) > -1 ? "matching_interests" : "interests"} key={i}>{interest}</div>) : null}
          </div>
        </div>
        <MatchBar addFriend={this.props.addFriend} rejectMatch={this.props.rejectMatch} saveMatch={this.props.saveMatch} />
      </div>
    )
  }
}

export default Match;