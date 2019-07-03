import React, { Component } from 'react';
import STORE from './ChannelDummy';
import Channel from '../../components/Channel/Channel';

class ChannelRoute extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <>
        <Channel channel={STORE} />
      </>
    );
  }
}

export default ChannelRoute;
