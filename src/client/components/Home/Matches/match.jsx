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

    this.handleExpandChange = this.handleExpandChange.bind(this);
    this.handleToggle = this.handleToggle.bind(this);
    this.handleExpand = this.handleExpand.bind(this);
  }

  handleExpandChange(expanded) {
    this.setState({expanded: expanded});
  }

  handleToggle(event, toggle) {
    this.setState({expanded: toggle});
  }

  handleExpand() {
    this.setState({expanded: true});
  }

  render() {
    let userInterests = this.props.user.Interests.split('-');
    return (
      <Card style={{ backgroundImage: "url(styles/creampaper.png)", "margin": "20px" }}  expanded={this.state.expanded} onExpandChange={this.handleExpandChange}>
        <CardHeader
          title={this.props.match.Name}
          subtitle={this.props.match.City}
          avatar={this.props.match.Image}
          actAsExpander={true}
          showExpandableButton={true}
          />
        <CardText>
          <Toggle
            toggled={this.state.expanded}
            onToggle={this.handleToggle}
            labelPosition="right"
            />
        </CardText>
        <CardTitle title={this.props.match.Profession} subtitle={` @ ${this.props.match.Company}`} expandable={true}/>
        {this.props.match ? this.props.match.Interests.split('-').sort((a, b) => userInterests.indexOf(a) > 0 ? -1 : 1).map((interest, i) => <div expandable={ true } className={userInterests.indexOf(interest) > -1 ? "interests matching_interests" : "interests"} key={i}>{interest}</div>) : null}
        <Rating expandable={ true } style={{ "height": "10px" }} value={this.props.match.Rating_Average} max={5} readOnly={true} onChange={() => console.log("nothing")} />
        <MatchBar addFriend={this.props.addFriend} rejectMatch={this.props.rejectMatch} saveMatch={this.props.saveMatch} expandable={true} />
        <CardActions expandable={true}>
        </CardActions>
      </Card>
    )
  }
}

export default Match;