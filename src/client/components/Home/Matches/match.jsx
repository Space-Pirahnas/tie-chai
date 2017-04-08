import React from 'react';

export const Match = ({ match }) => (
  <div className="match">
    <div className="home_match">
      {match.Image ? <img href={match.Image} /> : <img src="http://www.propertybaazaar.com/images/noprofile.png" className="home_image"/> }
      <div>
        <div className="home_name">{match.Name}</div>
        <div>{match.City}</div>
        <div className="home_match">
          {match.Interests.map(interest => <div className="interests">{interest}</div>)}
        </div>
      </div>
    </div>
  </div>
);

export default Match;