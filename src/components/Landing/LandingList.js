import React, { Component } from 'react';

class LandingList extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    let channel = this.props.channel
    return (
      <div>
        <h3>{channel.channelTitle}</h3>
        <img src={channel.thumbnails.default.url} alt={`thumbnail for ${channel.title}`} />
        <p>{channel.description}</p>
      </div>
    );
  }
}

export default LandingList;
