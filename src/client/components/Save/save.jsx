import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as matches from '../../actions/matches.jsx';
import * as saves from '../../actions/saves.jsx';
import { axiosInstance } from '../../actions/index.jsx';
import { AutoRotatingCarousel, Slide } from 'material-auto-rotating-carousel';
import { green400, green600, blue400, blue600, red400, red600 } from 'material-ui/styles/colors';
import { hashHistory } from 'react-router';

class Save extends Component {
  constructor(props) {
    super(props);
    this.state = {
      index: 0
    }
    this.changeSlide = this.changeSlide.bind(this);
    this.addFriend = this.addFriend.bind(this);
  }

  componentWillMount() {
    this.props.getSavedUsers(this.props.user.Email);
  }

  changeSlide(index) {
    this.setState({
      index: index
    });
  }

  viewUser(save){
    hashHistory.push(`/profile/${save.Email}`)
  }

  addFriend(){
    this.props.handleMatch(this.props.savedUsers[this.state.index], "Friend", "/api/friends", this.props.user);
  }

  render() {
    return (
      <div className="background" style={{ backgroundImage: "url(styles/tweed.png)" }}>
        {this.props.savedUsers && this.props.savedUsers.length ?
          <AutoRotatingCarousel style={{ "zIndex": 0, overflow: "auto", margin: "10% auto", height: "600px", background: "transparent" }} autoplay={false} label="Connect!" onChange={this.changeSlide} onStart={this.addFriend} open>
            {this.props.savedUsers.map((save, i) =>
              <Slide
                key={i}
                media={<img className="savedPic" src={save.Image ? save.Image : "./styles/noprofile.png"} />}
                mediaBackgroundStyle={{ backgroundColor: blue400 }}
                contentStyle={{ backgroundColor: blue600 }}
                title={save.Name}
                subtitle={`${save.Profession} @ ${save.Company} | ${save.City} | I'm interested in ${save.Interests.replace(/-/, ', ')} | ${save.Bio}`}
                />
            )}
          </AutoRotatingCarousel> : 
          <div className="saveDefaultBackground" >
            <img src="styles/lonely.png"/>
            <p>Empty</p>
          </div>
        }
      </div>
    )
  }
}

function mapStateToProps(state) {
  return {
    user: state.userInfo.user,
    savedUsers: state.savedUsers
  }
}

export default connect(mapStateToProps, { ...matches, ...saves })(Save);