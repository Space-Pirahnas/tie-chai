import React, { Component } from 'react';

class Search extends Component {
  constructor(props) {
    super(props);

  }

  render() {
    return (
      <div id="search" className="Search">
        <input type="search" placeholder="Search for a friend..."/>
      </div>
    )
  }
};

export default Search;