import React from 'react';
import { connect } from 'react-redux'
import * as actions from '../../actions/matches.jsx';
import { Link, hashHistory } from 'react-router';
import Badge from 'material-ui/Badge';
import IconButton from 'material-ui/IconButton';
import NotificationsIcon from 'material-ui/svg-icons/social/notifications';

class Notification extends React.Component {
  constructor(props) {
    super(props);
    this.onClick = this.onClick.bind(this);
  }

  onClick() {
    hashHistory.push('/friends');
    this.props.resetNotifications(this.props.userInfo.Email);
  }

  render() {
    if (this.props.userInfo) {
      return (
        <Badge onClick={ this.onClick } badgeContent={this.props.userInfo.NewFriends} primary={true} badgeStyle={{ paddingRight: "12px" }} >
          <IconButton tooltip="Notifications">
            <NotificationsIcon  style={{ left: "20px", top: "0px" }}/>
          </IconButton>
        </Badge>
      );
    } else {
      return <div>Loading...</div>
    }
  }
};

function mapStateToProps(state) {
  return { userInfo: state.userInfo.user }
}

export default connect(mapStateToProps, actions)(Notification);