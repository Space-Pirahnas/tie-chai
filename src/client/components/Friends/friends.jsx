import React from 'react';
import { connect } from 'react-redux';
import * as action from '../../actions/index.jsx';

class Friends extends React.Component {
  constructor(props) {
    super(props);
    console.log("Friends component props.friends ", props);
  }

  render () {
    return (
      <h1>Friends List From Friends.jsx</h1>
    );
  }
};

function mapStateToProps(state) {
  return { friends: state.friends.data};
}


export default connect(mapStateToProps, action)(Friends);