import React, { Component } from 'react';
import config from '../../config';
import Channel from '../../components/Channel/Channel';
import axios from 'axios';
const KEY = process.env.REACT_APP_YTAPI;

class ChannelRoute extends Component {
  constructor(props) {
    super(props);
    //console.log(props.match.params.id)
    this.state = {
      channel: {},
      id: props.match.params.id
    };
  }

  componentDidMount() {
/*    axios.get('https://www.googleapis.com/youtube/v3/search', {
      params: {
          q: 'The Onion',
          part: 'snippet',
          maxResults: 5,
          key: KEY,
          type: 'channel'
      }
    }).then(res => {
      console.log(res)
    }) */
    axios.get('https://www.googleapis.com/youtube/v3/channels', {
      params: {
          id: "UCfAOh2t5DpxVrgS9NQKjC7A",
          part: 'snippet,contentDetails,statistics',
          maxResults: 1,
          key: KEY,
      }
    }).then(res => {
      this.setState({
        channel: res.data.items[0]
       });
    })
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
