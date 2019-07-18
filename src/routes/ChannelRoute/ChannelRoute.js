import React, { Component } from 'react';
import Channel from '../../components/Channel/Channel';

class ChannelRoute extends Component {
  constructor(props) {
    super(props);
    this.state = {
      channel: {},
      id: props.match.params.id
    };
  }

  render() {
    return (
      <>
        <Channel channel={this.state.channel} id={this.state.id} />
      </>
    );
  }
}

export default ChannelRoute;