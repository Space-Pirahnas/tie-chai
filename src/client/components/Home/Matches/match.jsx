import React from 'react';

export const Match = ({ match }) => (
  <div>
    <div>{match.Name}</div>
    <div>{match.Email}</div>
    <div>{match.City}</div>
    <div>{match.Image}</div>
    <div>{match.Interests}</div>
    {/*<div>{match.Reviews}</div>*/}
  </div>
);

export default Match;