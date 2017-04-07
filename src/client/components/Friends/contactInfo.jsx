import React from 'react';

const ContactInfo = (props) => {
  const styles = {
    backgroundImage: "url(" + this.props.person.image + ")"
  }

  return (
    <div className="contact-info">
      <img className="image" style={styles} />
      <div className="Interests">
        <h2>Interests</h2>
        {this.props.person.interests.map((interest) =>
          <div className="interest Button">{interest}</div>
        )}
      </div>
      <div id="clear"></div>
      <div style={{ "margin-left": "50px" }}>
        <div>
          <p>{this.props.person.name} in {this.props.person.location}</p>
          <p>{this.props.person.email}</p>
        </div>
        <div className="button-wrapper" style={{ width: "20%" }}>
          <a href="/#/message" className="Button">Message</a>
        </div>
      </div>
    </div>
  )
}

export default ContactInfo;