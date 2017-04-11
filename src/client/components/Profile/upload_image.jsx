import React, { Component } from 'react';
import Dropzone from 'react-dropzone';
import { axiosInstance } from '../../actions/index.jsx';
import { connect } from 'react-redux';

class UploadImage extends Component {
    constructor(props) {
      super(props);
      this.onDrop = this.onDrop.bind(this);
    }

    onDrop(files) {
      axiosInstance.post('/api/upload_image', files[0], { headers: {Email: this.props.email}})
                   .then(res => {
                    console.log(res, "success!");
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

export default connect(mapStateToProps)(UploadImage);