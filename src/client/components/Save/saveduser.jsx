import React, { Component } from 'react';
import { Slide } from 'material-auto-rotating-carousel';
import { green400, green600, blue400, blue600, red400, red600 } from 'material-ui/styles/colors';

export default class SavedUser extends Component {
  constructor(props) {
    super(props)

  }

  render() {
    const SavedInfo = () => {
      return (
        <div className="contactContainer">
          <div className="contactBio">
            { `${(this.props.save.Bio).substring(0, 300)}...` }     
          </div>
          <div className="contactInterests">
            { this.props.save.Interests.split('-').map((interest, i) =>
              <div className="profileInterest" key={i}>{interest}</div>
            )}
          </div>
          <div className="contactButtons">
            <a style={{ margin: "0 20px" }} href="/#/message" className="Button">Message</a>
            <a style={{ margin: "0 20px" }} href={`/#/profile/${ this.props.save.Email }`} className="Button">Profile</a>
          </div>
        </div>
      )
    }
    return (
      <div>
        <Slide
          media={<img src={ this.props.save.Image } />}
          mediaBackgroundStyle={{ backgroundColor: red400 }}
          contentStyle={{ backgroundColor: red600 }}
          title={ this.props.save.Name }
          subtitle={`${ this.props.save.Profession } @ ${ this.props.save.Company }`}
        />
        <SavedInfo />
      </div>
    )
  }
}