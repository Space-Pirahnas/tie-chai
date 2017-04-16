import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from '../../actions/events.jsx';

class EventView extends Component {

  constructor(props) {
    super(props);
    this.props.getTargetEvent(this.props.params.eventID);
  }


  render(){
    console.log(this.props.event, "THIS IS WORKING HERE EVENT");
    return(
      <div>EVENT</div>
    )
  }
}

function mapStateToProps(state) {
  return {
    event: state.targetEvent
  }
}

export default connect(mapStateToProps, actions)(EventView);