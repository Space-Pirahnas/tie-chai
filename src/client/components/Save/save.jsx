import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from '../../actions/saves.jsx';
import SavedUser from './saveduser.jsx';
import { axiosInstance } from '../../actions/index.jsx';
import { AutoRotatingCarousel } from 'material-auto-rotating-carousel';

class Save extends Component {
  constructor(props) {
    super(props);
  }

  componentWillMount() {
    this.props.getSavedUsers(this.props.email);
  }

  render() {
    if (this.props && this.props.savedUsers.length) {
      return (
        <AutoRotatingCarousel className="Carousel" label="Connect" >
          {this.props.savedUsers.map((save, i) =>
            <SavedUser save={save} key={i} />
            )
          }
        </AutoRotatingCarousel>
      )
    } else {
      return (<div>loading</div>);
    }
  }
}

function mapStateToProps(state) {
  return {
    email: state.userInfo.user.Email,
    savedUsers: state.savedUsers
  }
}

export default connect(mapStateToProps, actions)(Save);