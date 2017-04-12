import React from 'react';
import { connect } from 'react-redux'
import * as actions from '../../actions/index.jsx';
import { Link } from 'react-router';

class NavProfile extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    if (!this.props.userInfo) {
      return null
    }
    return (
      <Link to={`profile/${this.props.userInfo.Email}`} className="UserProfile">
        <div className="User">
          <div className="name">{ this.props.userInfo.Name }</div>
          <div className="image">
            {
              this.props.userInfo.Image ? <img src={ `http:${this.props.userInfo.Image.slice(5)}` } /> :  <img src={"./styles/noprofile.png"} />
            }
          </div>
        </div>
      </Link>
      );
  }
};

function mapStateToProps(state) {
  return { userInfo: state.userInfo.user }
}

export default connect(mapStateToProps, actions)(NavProfile);