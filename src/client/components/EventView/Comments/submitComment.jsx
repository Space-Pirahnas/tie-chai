import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from '../../../actions/comments.jsx';
import TextField from 'material-ui/TextField';
import FlatButton from 'material-ui/FlatButton';

class SubmitComment extends Component {

  constructor(props) {
    super(props);
    this.state = {
      subject: '',
      text: ''
    }
    this.textChange = this.textChange.bind(this);
    this.subjectChange = this.subjectChange.bind(this);
    this.submitComment = this.submitComment.bind(this);
  }

  textChange(e){
    this.setState({
      text: e.target.value
    });
  }

  subjectChange(e){
    this.setState({
      subject: e.target.value
    });
  }

  submitComment() {
    this.props.toggleComment();
    this.props.commentEvent(this.props.eventKey, this.props.user.Email, this.state.subject, this.state.text )
  }

  render() {
    return (
      <div>
        <TextField hintText="Subject" onChange={this.subjectChange}/>
        <TextField hintText="Text" onChange={this.textChange}/>
        <FlatButton label="Submit!" onClick={this.submitComment}/>
      </div>
    )
  }
}

function mapStateToProps(state) {
  return {
    comments: state.targetEvent.target.Comments,
    user: state.userInfo.user
  }
}

export default connect(mapStateToProps, actions)(SubmitComment);