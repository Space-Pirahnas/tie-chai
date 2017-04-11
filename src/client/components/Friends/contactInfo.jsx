import React from 'react';

const ContactInfo = (props) => {
  return (
    <div className="contact-info">
      <img className="friends_image" src={props.person.Image} />
      <div>
        <h2 style={{ "margin": "1em auto", "text-align": "center" }}>Interests</h2>
        {props.person.Interests.split('-').map((interest, i) =>
          <div className="interest Button" key={i}>{interest}</div>
        )}
      </div>
        <div>
          <p style={{"font-weight": "bold", "color": "#337ab7"}} >{props.person.Name}</p><p> in {props.person.City}</p>
          <p>{props.person.Email}</p>
        </div>
        <div style={{ "margin": "0 auto", "width": "40%" }}>
          <a href="/#/message" className="Button">Message</a>
        </div>
      </div>
  )
}

export default ContactInfo;