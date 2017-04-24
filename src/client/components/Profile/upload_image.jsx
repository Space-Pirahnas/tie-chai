import React, { Component } from 'react';
import Dropzone from 'react-dropzone';
import { axiosInstance } from '../../actions/index.jsx';
import { connect } from 'react-redux';
import * as actions from '../../actions/matches.jsx';
import { getUserInfo } from '../../actions/index.jsx';
import CircularProgress from 'material-ui/CircularProgress';

class UploadImage extends Component {
    constructor(props) {
      super(props);
      this.state = {
        downloading: false
      }
      this.onDrop = this.onDrop.bind(this);
    }

    onDrop(files) {
      this.setState({
        downloading: true
      });

      axiosInstance.post('/api/upload_image', files[0], { headers: {Email: this.props.email}})
                   .then(res => {
                    this.props.getTarget(this.props.email, this.props.email);
                    return true;
                   })
                   .then(res => {
                    let token = localStorage.getItem('token');
                    this.props.toggleEdit();
                    this.props.getUserInfo(token, this.props.email, false);
                   })
                   .catch(err => {
                     console.error("error uploading image", err);
                   })
    }

    render(){
      if (!this.state.downloading) {
        return (
            <div>
              <Dropzone name="uploadfile" onDrop={this.onDrop} multiple={false} >
                <div>Drop a file here, OR click to select a file to upload.</div>
              </Dropzone>
            </div>
        );
      } else {
      return (
        <div><CircularProgress size={100} thickness={13} color="#FFB300" /></div>
      )
      }
    }
}

function mapStateToProps(state) {
  return {
    email: state.userInfo.user.Email
  }
}

export default connect(mapStateToProps, {...actions, getUserInfo})(UploadImage);