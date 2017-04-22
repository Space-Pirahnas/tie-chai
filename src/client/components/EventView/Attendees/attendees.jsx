import React, { Component } from 'react';
import Avatar from 'material-ui/Avatar';
import Chip from 'material-ui/Chip';

class Attendees extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    const styles = {
      chip: {
        margin: 4,
      },
      wrapper: {
        display: 'flex',
        flexWrap: 'wrap',
        marginBottom: '15px',
        marginLeft: '15px',
      },
    };
    const attendees = this.props.attendees;
    return (
      <div style={styles.wrapper}>
        {attendees.map((attendee) => (
          <Chip style={styles.chip} key={attendee.ID} onTouchTap={this.props.toggleAttendee.bind(this, attendee)}>
            <Avatar src={attendee.Image ? attendee.Image : "styles/noprofile.png"} />
            {attendee.Name}
          </Chip>
        ))}
      </div>
    )
  }
}

export default Attendees;


