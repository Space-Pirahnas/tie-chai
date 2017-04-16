import React from 'react';
import { connect } from 'react-redux'
import * as actions from '../../actions/index.jsx';
import { Link, hashHistory } from 'react-router';
import Badge from 'material-ui/Badge';
import IconButton from 'material-ui/IconButton';
import NotificationsIcon from 'material-ui/svg-icons/social/notifications';

class Notification extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      notifications: 4
    }
    this.onClick = this.onClick.bind(this);
  }

  onClick() {
    hashHistory.push('/');
    setTimeout(() => {
      hashHistory.push(`/#/home`)
    });
    this.setState({
      notifications: 0
    })
  }

  render() {
    return (
      <Badge onClick={ this.onClick } badgeContent={ this.state.notifications } primary={true} badgeStyle={{top: 12, right: 12}} style={{ padding: "15px 8px 0px 0px" }}>
        <IconButton tooltip="Notifications">
          <NotificationsIcon />
        </IconButton>
      </Badge>
    );
  }
};

function mapStateToProps(state) {
  return { userInfo: state.userInfo.user }
}

export default connect(mapStateToProps, actions)(Notification);