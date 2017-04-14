import React from 'react';
import Events from './Events/events.jsx';
import Matches from './Matches/matches.jsx';
import { connect } from 'react-redux';
import { axiosInstance } from '../../actions/index.jsx';


class Home extends React.Component {
  constructor(props) {
    super(props);
    this.resendLink = this.resendLink.bind(this);
  }

  resendLink(){
    axiosInstance.post('/api/verify', {
      Email: this.props.user.Email,
      Name: this.props.user.Name
    })
     .then(res => {
       console.log("sucessfully sent");
     })
     .catch(err =>{
       console.error("could not send link", err);
     });
  }

  render () {
    return (
      <div>
        <div> 
          <div className="home">
            <div>
             {/*{this.props.verified !== "true" ? <div style={{color: "red", fontSize: "15px"}}><div>Hi! we noticed you haven't verified your email address.</div><div>Unfortunately you are going to need to before using this application. <div>Select <em><u><i onClick={this.resendLink}>here</i></u></em> to resend the link.</div></div></div>:*/}
              <div>
                <h1>Events!</h1> 
                <Events />
              </div>
            </div>
            <div>
              <h1>Today's Matches!</h1>
              <Matches />
            </div>
          </div>
        </div>
      </div>
    );
  }
};

function mapStateToProps(state) {
  return {
    user: state.userInfo.user,
    verified: state.userInfo.user.Verified === "true"
  }
}

export default connect(mapStateToProps)(Home);