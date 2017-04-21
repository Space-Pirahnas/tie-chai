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
      <div className="matchCard" style={{ backgroundImage: "url(styles/creampaper.png)", "margin": "20px" }}>
        <div className="matchImage">
          {
            this.props.match.Image ? <img src={`http:${this.props.match.Image.slice(5)}`} /> : <img src={"./styles/noprofile.png"} />
          }
        </div>
        <div className="matchProfile">
          <div className="matchName" >
            { this.props.match.Name }
          </div>
          <div className="matchLocation" >
            { this.props.match.Location }
          </div>
        </div>
        <div className="matchInfo">
          <div>
          
          </div>
        </div>
      </div>
      <Card style={{ backgroundImage: "url(styles/creampaper.png)", "margin": "20px" }} >
        <CardHeader
          title={this.props.match.Name}
          subtitle={this.props.match.City}
          avatar={this.props.match.Image}
          />
        <CardTitle title={this.props.match.Profession} subtitle={` @ ${this.props.match.Company}`} />
        <CardText>
          {this.props.match ? this.props.match.Interests.split('-').sort((a, b) => userInterests.indexOf(a) > 0 ? -1 : 1).map((interest, i) => <div expandable={true} className={userInterests.indexOf(interest) > -1 ? "interests matching_interests" : "interests"} key={i}>{interest}</div>) : null}
          <MatchBar addFriend={this.props.addFriend} rejectMatch={this.props.rejectMatch} saveMatch={this.props.saveMatch} />
        </CardText>
        <CardActions >
        </CardActions>
      </Card>
    )
  }
}

export default Match;