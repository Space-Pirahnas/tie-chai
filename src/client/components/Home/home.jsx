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
        <div className="background" style={{backgroundColor: "rgba(0,0,0,1)"}}> 
          <div className="home">
            <div className="eventsContainer">
              <Events />
            </div>
            <div className="matchesContainer">
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