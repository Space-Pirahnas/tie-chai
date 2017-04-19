import React from 'react';
import {Card, CardActions, CardHeader, CardMedia, CardTitle, CardText} from 'material-ui/Card';
import FlatButton from 'material-ui/FlatButton';
import Toggle from 'material-ui/Toggle';
import ContactInfo from './contactInfo.jsx';
import { connect } from 'react-redux';

class FriendCard extends React.Component {
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
  
  render () {
    return (
      <Card style={{ background: "rgba(248,248,255,0.7)" }} expanded={this.state.expanded} onExpandChange={this.handleExpandChange}>
        <CardHeader
          title={ this.props.friend.Name }
          subtitle={ this.props.friend.City}
          avatar={ this.props.friend.Image }
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
        <CardTitle title={ this.props.friend.Profession } subtitle={` @ ${ this.props.friend.Company }`} expandable={true} />
        <ContactInfo person={this.props.friend} user={this.props.user} expandable={ true } />
        <CardActions expandable={ true }>
        </CardActions>
      </Card>
    )
  }
};

function mapStateToProps(state){
  return {
    user: state.userInfo.user
  }
}

export default connect(mapStateToProps)(FriendCard);