import React from 'react';

const TimeLocation = (props) => {
  const { business, location } = props;
  const datetime = props.datetime.split(' at ');
  const date = datetime[0], time = datetime[1];
  return (
    <div>
      <ul className="event-ul">
        <li className="eventList">
          <div className="iconClass"><i className="fa fa-clock-o fa-lg" /></div>
          <ul>
            <li><h3 className="subTitle-display">{date}</h3></li>
            <li><h4>{time}</h4></li>
          </ul>
        </li>
        <li className="eventList">
          <div className="iconClass"><i className="fa fa-map-marker fa-lg" /></div>
          <ul>
            <li><h3 className="subTitle-display">{business}</h3></li>
            <li><h4>{location}</h4></li>
          </ul>
        </li>
      </ul>
    </div>
  );
};

export default TimeLocation;