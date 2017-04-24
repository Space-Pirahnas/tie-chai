import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from '../../../actions/comments.jsx';
import TextField from 'material-ui/TextField';
import FlatButton from 'material-ui/FlatButton';
import Divider from 'material-ui/Divider';
import Paper from 'material-ui/Paper';
import { Card, CardActions, CardHeader, CardText } from 'material-ui/Card';

class SubmitComment extends Component {

  constructor(props) {
    super(props);
    this.state = {
      text: ''
    }
    this.textChange = this.textChange.bind(this);
    this.submitComment = this.submitComment.bind(this);
  }

  textChange(e) {
    this.setState({
      text: e.target.value
    });
  }

  submitComment(e) {
    e.preventDefault();
    this.props.toggleComment();
    this.props.commentEvent(this.props.eventKey, this.props.user.Email, this.state.text)
  }

  render() {
    const { Image, Name } = this.props.user;
    return (
      <div>
        <Card>
          <CardHeader
            title={Name}
            avatar={Image ? `http:${Image.slice(5)}` : "styles/noprofile.png"}
          />
          <CardText>
            <div>
              <form onSubmit={this.submitComment}>
                <TextField hintText="Comment" onChange={this.textChange} fullWidth={true} />
              </form>
            </div>
          </CardText>
          <CardActions>
            <FlatButton label="Comment" disabled={!this.state.text} icon={<i className="fa fa-comment-o" />} hoverColor="#EDECEC" primary={true} onClick={this.submitComment}/>
            <FlatButton label="Cancel" hoverColor="#EDECEC" onClick={this.props.toggleComment} />
          </CardActions>
        </Card>
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