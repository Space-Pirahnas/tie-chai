import React, { Component } from 'react';
import { Link } from 'react-router';
import { connect } from 'react-redux';
import * as actions from '../actions/saves.jsx';
import { PieChart } from 'react-d3-components'

class IndexPage extends Component {
  constructor(props) {
    super(props);
  }
  render() {

    let data = {
      label: 'somethingA',
      values: [{ x: 'SomethingA', y: 10 }, { x: 'SomethingB', y: 4 }, { x: 'SomethingC', y: 3 }]
    };

    let sort = null;
    return (
      <div>
        <div className="index">
          <div className="hero-text-box">
            <h1>Expand your network.<br />Meet professionals with similar interests.</h1>
            <a className="btn btn-full" href="/#/auth/signup">Sign Up</a>
          </div>
        </div>
        <section>
          <div className="details">
            <div>
              <h1>
                <img style={{ "maxWidth": "80px", display: "inline-block" }} className="linkedin" src={"styles/linkedin.svg"} />
                <span style={{ margin: "10px" }} >meets</span>
                <img style={{ "maxWidth": "50px", display: "inline-block" }} className="tinder" src={"styles/tinder.svg"} />
              </h1>
              <p className="long-copy">Tired of being unable to connect with people through Linkedin? So were we. We created Tie-Chai to serve as an alternative for those looking to form stronger relationships. We combine a similar matching formula to tinder where both users need to share a mutual desire to connect in order for there to be a match. Users can create/publish events to their connections and message them to organize meetups.</p>
            </div>
            <div className="row">
              <div className="col span-1-of-3 box">
                <div>
                  <i className="fa fa-arrow-circle-o-up fa-4x skills-icon"></i>
                  <span className="skills-title">100+ Interests!</span>
                </div>
                <p>Tie-Chai currently has support for 100+ interests and growing everyday! Meet people who share similar interests to you today!</p>
              </div>
              <div className="col span-1-of-3 box">
                <div>
                  <i className="fa fa-street-view fa-4x skills-icon"></i>
                  <span className="skills-title">100% Secure</span>
                </div>
                <p>At Tie-Chai, your information is completely secure and will not be shared with anyone else. On top of that, there are ZERO advertisements.</p>
              </div>
              <div className="col span-1-of-3 box">
                <div>
                  <i className="fa fa-map-o fa-4x skills-icon" aria-hidden="true"></i>
                  <span className="skills-title">50+ Cities!</span>
                </div>
                <p>Tie-Chai currently supports all the major cities in the United States and is branching out daily. If your city is not listed yet, do not worry! We shall have it up shortly. </p>
              </div>
            </div>
            <div className="row">
              <div className="col span-1-of-2 box">
                <div>
                  <i className="fa fa-arrow-circle-o-up fa-4x skills-icon"></i>
                  <span className="skills-title">100+ Interests!</span>
                </div>
                <p>Tie-Chai currently has support for 100+ interests and growing everyday! Meet people who share similar interests to you today!</p>
              </div>
              <div className="col span-1-of-2 box">
                <PieChart
                  data={data}
                  width={600}
                  height={400}
                  margin={{ top: 10, bottom: 10, left: 100, right: 100 }}
                  sort={sort}
                  />
                <p>At Tie-Chai, your information is completely secure and will not be shared with anyone else. On top of that, there are ZERO advertisements.</p>
              </div>
            </div>
          </div>
        </section>
        <footer>
          <div className="footer">
            <div className="row">
              <div className="col span-2-of-4">
                Copyright &copy; 2017 Tie-Chai
              </div>
              <div className="col span-2-of-4">
                Contact Us: chai.tie.us@gmail.com
              </div>
            </div>
          </div>
        </footer>
      </div>
    );
  }
};

function mapStateToProps(state) {
  return {
    cities: state.cities,
    interests: state.interests
  }
}

export default connect(mapStateToProps, actions)(IndexPage);