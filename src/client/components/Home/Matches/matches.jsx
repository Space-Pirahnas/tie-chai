import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from '../../../actions/matches.jsx';
import Match from './match.jsx';
import axios from 'axios';
import { axiosInstance } from '../../../actions/index.jsx';

class Matches extends Component {
  constructor(props) {
    super(props);
    this.fetchMatches = this.fetchMatches.bind(this);
  }

  componentDidMount() {
    this.fetchMatches();
  }

  fetchMatches() {
    this.props.getMatches(this.props.email);
  }

  addFriend(friend) {
    axiosInstance.post('/api/friends', { User: { Email: "test555@gmail.com" }, Friend: {Email: friend.Email}})
                 .then(res => {
                   this.props.getMatches(this.props.email);
                 })
                 .catch(err => {
                   console.error("cound not add friend");
                 });
  }

  rejectMatch(reject) {
    axiosInstance.post('/api/reject', {User: {Email: "test555@gmail.com"}, Reject: {Email: reject.Email}} )
                 .then(res => {
                   this.props.getMatches(this.props.email);
                 })
                 .catch(err => {
                   console.error("could not reject");
                 });
  }

  render() {
    return (
      <div className="matches">
        { this.props.matches ? this.props.matches.map(match => <Match match={ match } addFriend={this.addFriend.bind(this, match)} rejectMatch={this.rejectMatch.bind(this,match)} />) : <div></div> }
      </div>
    )
  }
}

function mapStateToProps(state){
  return {
    email: state.email,
    city: state.city,
    matches: state.matches
  }
}

export default connect(mapStateToProps, actions)(Matches);