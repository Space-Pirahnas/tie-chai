import React from 'react';

const TimeComp = (props) => {
  const datetime = props.datetime.split(' at ');
  const date = datetime[0], time = datetime[1];
  console.log('in time component date and time', date, time);
  return (
  <div>
    <div><i className="fa fa-clock-o" /></div>
    <div><h2>{date}</h2><br/><span>{time}</span></div>
  </div>
  );
};

const LocationComp = (props) => {
  
}

export default TimeComp;