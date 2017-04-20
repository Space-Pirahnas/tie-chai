import React, { Component } from 'react';
import MatchBar from './matchbar.jsx';
import { Rating } from 'material-ui-rating';
import {Card, CardActions, CardHeader, CardMedia, CardTitle, CardText} from 'material-ui/Card';
import FlatButton from 'material-ui/FlatButton';

class Match extends Component {
  constructor(props) {
    super(props);

  }

  render() {
    let userInterests = this.props.user.Interests.split('-');
    return (
      <Card style={{ backgroundImage: "url(styles/creampaper.png)", "margin": "20px" }} >
        <CardHeader
          title={ this.props.match.Name }
          subtitle={ this.props.match.City}
          avatar={ this.props.match.Image }
          subtitle={ <Rating style={{ "height": "10px" }} value={this.props.match.Rating_Average} max={5} readOnly={true} onChange={() => console.log("nothing")} /> }
        />
        <CardText>  
          {this.props.match ? this.props.match.Interests.split('-').sort((a,b) => userInterests.indexOf(a) > 0 ? -1 : 1).map((interest,i) => <div className={userInterests.indexOf(interest) > -1 ? "interests matching_interests" : "interests"} key={i}>{interest}</div> ) : null}
          <MatchBar addFriend={this.props.addFriend} rejectMatch={this.props.rejectMatch} saveMatch={this.props.saveMatch} />
        </CardText>
        <CardTitle title={ this.props.match.Profession } subtitle={` @ ${ this.props.match.Company }`} />
      </Card>
    )
  }
}

export default Match;