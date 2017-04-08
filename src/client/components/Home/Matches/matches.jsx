import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from '../../../actions/matches.jsx';
import Match from './match.jsx';
import axios from 'axios';

class Matches extends Component {
  constructor(props) {
    super(props);
    this.state = {
      mounted: false
    }
    this.fetchMatches = this.fetchMatches.bind(this);
  }

  componentDidMount() {
    this.fetchMatches();
  }

  fetchMatches() {
    this.props.getMatches(this.props.email);
  }

  render() {
    return (
      <div className="matches">
        { this.props.matches.map(match => <Match match={ match } />) }
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