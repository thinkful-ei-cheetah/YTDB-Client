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
            <img src={channel.thumbnail} alt={`thumbnail for ${channel.title}`} /><br />
          </Link>

        <div className='ind_results_channel_right_top'>
          <div className='ind_results_channel_title'>
            <Link to={`/channel/${channel.channelId}`} className='link-channel'>
            {channel.title}
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

export default LandingList;