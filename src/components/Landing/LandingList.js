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
        <h3>{channel.title}</h3>
        <img src={channel.thumbnail} alt={`thumbnail for ${channel.title}`} /><br />
        <Link to={`/channel/${channel.yt_id}`} className='link-channel'>
          <button>
            Details
          </button>
        </Link>
        <button onClick={ () => this.context.addFavorite(channel) }>
          Add Favorite
        </button>
        <p>{channel.description}</p>
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
