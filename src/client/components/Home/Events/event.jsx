import React from 'react';

const Event = ({ event }) => (
  <div>
    <div>{event.Location}</div>
    <div>{event.Description}</div>
    <div>{event.Time}</div>
    <div>{event.Date}</div>
    <div>{event.Email}</div>
  </div>
);

export default Event;