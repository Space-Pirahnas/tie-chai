import React from 'react';

const ContactInfo = (props) => {
  console.log('props in contactInfo: ', props);
  const styles = {
    backgroundImage: "url(" + props.person.Image + ")"
  }

  return (
    <div className="contact-info">
      <img className="image" style={styles} />
      <div>
        <h2 style={{ "margin": "1em auto", "text-align": "center" }}>Interests</h2>
        {props.person.Interests.map((interest) =>
          <div className="interest Button">{interest}</div>
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