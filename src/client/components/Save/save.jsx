import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from '../../actions/saves.jsx';
import SavedUser from './saveduser.jsx';
import { axiosInstance } from '../../actions/index.jsx';

class Save extends Component {
  constructor(props) {
    super(props);
  }

  componentWillMount() {
    this.props.getSavedUsers(this.props.email);
  }

  render() {
    // console.log(this.props.savedUsers);
    return (
      <div className="save">
        {this.props.savedUsers ? this.props.savedUsers.map((save, i) => <SavedUser key={i} save={save} />) : null}
      </div>
    )
  }

}

function mapStateToProps(state) {
  console.log("state here", state);
  return {
    email: state.userInfo.user.Email,
    savedUsers: state.savedUsers
  }
}

export default connect(mapStateToProps, actions)(Save);