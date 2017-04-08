import React from 'react';

const Event = ({ event }) => (
  <div>
    <div className="home_event">
      <div className="home_event_title">{event.Title}</div>
      <div>with: {event.Name}</div>
      <div className="home_event_date">
        <div style={{marginRight: 5}}>{event.Time}</div>
        <div>{event.Date}</div>
      </div>
      <div>{event.Location}</div>
      <div>{event.Description}</div>
    </div>
  </div>
);

export default Event;