import React from 'react';

const ContactInfo = (props) => {
  return (
    <div className="contactContainer">
      <div className="contactBio">
        { `${(props.person.Bio).substring(0, 300)}...` }     
      </div>
      <div className="contactInterests">
        {props.person.Interests.split('-').map((interest, i) =>
          <div className="profileInterest" key={i}>{interest}</div>
        )}
      </div>
      <div className="contactButtons">
        <a style={{ margin: "0 20px" }} href="/#/message" className="Button">Message</a>
        <a style={{ margin: "0 20px" }} href={`/#/profile/${props.person.Email}`} className="Button">Profile</a>
      </div>
    </div>
  )
}

export default ContactInfo;