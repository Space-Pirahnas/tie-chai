import React, { Component } from 'react';
import Dropzone from 'react-dropzone';
import { axiosInstance } from '../../actions/index.jsx';
import { connect } from 'react-redux';
import * as actions from '../../actions/matches.jsx';
import { getUserInfo } from '../../actions/index.jsx';

class UploadImage extends Component {
    constructor(props) {
      super(props);
      this.onDrop = this.onDrop.bind(this);
    }

    onDrop(files) {
      axiosInstance.post('/api/upload_image', files[0], { headers: {Email: this.props.email}})
                   .then(res => {
                    this.props.getTarget(this.props.email);
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
      return (
          <div>
            <Dropzone name="uploadfile" onDrop={this.onDrop} multiple={false} >
              <div>Drop a file here, OR click to select a file to upload.</div>
            </Dropzone>
          </div>
      );
    }
}

function mapStateToProps(state) {
  return {
    email: state.userInfo.user.Email
  }
}

export default connect(mapStateToProps, {...actions, getUserInfo})(UploadImage);