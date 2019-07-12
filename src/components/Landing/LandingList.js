import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import YTContext from '../../contexts/YTContext';

class LandingList extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  static contextType = YTContext;

  render() {
    let channel = this.props.channel
    return (
      <div className='ind_results'>

        <div className='ind_results_top'>
        
          <Link to={`/channel/${channel.channelId}`} className='link-channel'>
            <img src={channel.thumbnails.default.url} alt={`thumbnail for ${channel.title}`} /><br />
          </Link>

        <div className='ind_results_channel_right_top'>
          <div className='ind_results_channel_title'>
            <Link to={`/channel/${channel.channelId}`} className='link-channel'>
            {channel.channelTitle}
            </Link>
            </div>

            <div className='ind_results_channel_description'>
              {channel.description}
            </div>
          </div>
        </div>
        <div className='ind_results_bottom'>
          <button onClick={ () => this.context.addFavorite(channel) }>
            Add Favorite
          </button>
        </div>
      </div>
    );
  }
}
// title: channel.snippet.channelTitle,
// "yt_id": channel.id.channelId,
// thumbnail: channel.snippet.thumbnails.default.url,
// description: channel.snippet.description,
// "rating_total": null,
// "rating_count": null

export default LandingList;
