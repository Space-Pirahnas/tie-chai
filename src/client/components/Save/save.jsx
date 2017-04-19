import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from '../../actions/saves.jsx';
import { axiosInstance } from '../../actions/index.jsx';
import { AutoRotatingCarousel, Slide } from 'material-auto-rotating-carousel';
import { green400, green600, blue400, blue600, red400, red600 } from 'material-ui/styles/colors';

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
        <div className="background" style={{backgroundImage: "url(styles/tweed.png)"}}>
          <AutoRotatingCarousel style={{ "zIndex": 0, overflow: "auto", margin: "10% auto", height: "600px", background: "transparent" }} autoplay={ false } label="Connect!" open>
            {this.props.savedUsers.map((save, i) =>
              <Slide
                key={ i } 
                media={<img className="savedPic" src={ save.Image ? save.Image : "./styles/noprofile.png" } />}
                mediaBackgroundStyle={{ backgroundColor: blue400 }}
                contentStyle={{ backgroundColor: blue600 }}
                title={ save.Name }
                subtitle={`${ save.Profession } @ ${ save.Company } | ${ save.City } | I'm interested in ${ save.Interests.replace(/-/, ', ') } | ${ save.Bio } `}
              />
              )
            }
          </AutoRotatingCarousel>
        </div>
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