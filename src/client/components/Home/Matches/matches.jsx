import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from '../../../actions/matches.jsx';
import Match from './match.jsx';
import { axiosInstance, getUserInfo } from '../../../actions/index.jsx';
import { hashHistory } from 'react-router';

class Matches extends Component {
  constructor(props) {
    super(props);
    this.state = {
      page: 0
    }
    this.previous = this.previous.bind(this);
    this.next = this.next.bind(this);
    this.fetchMatches = this.fetchMatches.bind(this);
  }

  componentDidMount() {
    this.fetchMatches();
  }

  fetchMatches() {
    this.props.getMatches(this.props.user.Email, this.props.user.City);
  }

  addFriend(friend) {
    this.props.handleMatch(friend, "Friend", '/api/friends', this.props.user);
  }

  rejectMatch(reject) {
    this.props.handleMatch(reject, "Reject", '/api/reject', this.props.user);
  }

  saveMatch(match) {
    this.props.handleMatch(match, "Save", '/api/save', this.props.user);
  }

  previous() {
    this.setState({
      page: this.state.page - 1
    });
  }

  next() {
    this.setState({
      page: this.state.page + 1
    });
  }

  viewMatch(match) {
    // if (this.props.user.Verified === "true") {
      hashHistory.push(`/profile/${match.Email}`);
    // }
  }


  render() {
    return (
      <div>
        <div className="matches">
          { this.props.matches ? this.props.matches.slice(this.state.page * 4, this.state.page*4 + 4).map((match, i) => <Match user={this.props.user} match={ match } key={i} addFriend={this.addFriend.bind(this, match)} rejectMatch={this.rejectMatch.bind(this,match)} saveMatch={this.saveMatch.bind(this,match)} viewMatch={this.viewMatch.bind(this, match) }/>) : null }
          <div className="home_buttons">
            {this.state.page ? <input type= "image" onClick={this.previous} src={"./styles/left-arrow.svg"} className="arrow" /> : null }
            {this.props.matches.slice(this.state.page * 4, this.state.page*4 + 4).length >= 4 ? <input type= "image" onClick={this.next} src={"./styles/right-arrow.svg"} className="arrow" /> : null}
         </div>
        </div>
      </div>
    )
  }
}

function mapStateToProps(state){
  return {
    user: state.userInfo.user,
    matches: state.matches
  }
}

export default connect(mapStateToProps, actions )(Matches);