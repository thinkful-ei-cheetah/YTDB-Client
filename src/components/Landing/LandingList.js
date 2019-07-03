import React, { Component } from 'react';

class LandingList extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    return (
      <li>
        <p>{this.props.avatar}</p>
        <p>{this.props.title}</p>
        <p>{this.props.rating}</p>
      </li>
    );
  }
}

export default LandingList;
