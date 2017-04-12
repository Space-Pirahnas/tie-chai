import React from 'react';
import { connect } from 'react-redux'
import * as actions from '../../actions/index.jsx';
import { Link, hashHistory } from 'react-router';

class NavProfile extends React.Component {
  constructor(props) {
    super(props);
    this.onClick = this.onClick.bind(this);
  }

  onClick() {
    hashHistory.push('/');
    setTimeout(() => {
      hashHistory.push(`/profile/${this.props.userInfo.Email}`)
    });
  }

  render() {
    if (!this.props.userInfo) {
      return null;
    }
    return (
      <div onClick={this.onClick} className="UserProfile">
        <div className="User">
          <div className="name">{ this.props.userInfo.Name }</div>
          <div className="image">
            {
              this.props.userInfo.Image ? <img src={ `http:${this.props.userInfo.Image.slice(5)}` } /> :  <img src={"./styles/noprofile.png"} />
            }
          </div>
        </div>
      </div>
      );
  }
};

function mapStateToProps(state) {
  return { userInfo: state.userInfo.user }
}

export default connect(mapStateToProps, actions)(NavProfile);