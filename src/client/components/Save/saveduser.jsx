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
        <div className="savedContainer">
          <div className="savedBio">
            { `${(this.props.save.Bio).substring(0, 300)}...` }     
          </div>
          <div className="savedInterests">
            { this.props.save.Interests.split('-').map((interest, i) =>
              <div className="profileInterest" key={i}>{interest}</div>
            )}
          </div>
          <div className="savedButtons">
            <a style={{ margin: "0 20px" }} href="/#/message" className="Button">Message</a>
            <a style={{ margin: "0 20px" }} href={`/#/profile/${ this.props.save.Email }`} className="Button">Profile</a>
          </div>
        </div>
      )
    }
    return (
      <Slide
        media={<img className="savedPic" src={ this.props.save.Image ? this.props.save.Image : "./styles/noprofile.png" } />}
        mediaBackgroundStyle={{ backgroundColor: red400 }}
        contentStyle={{ backgroundColor: red600, margin: "20% auto"}}
        title={ this.props.save.Name }
        subtitle={`${ this.props.save.Profession } @ ${ this.props.save.Company } - ${ this.props.save.City }`}
      />
    )
  }
}