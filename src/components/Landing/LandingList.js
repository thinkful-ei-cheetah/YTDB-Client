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
        <h3>{channel.channelTitle}</h3>
        <img src={channel.thumbnails.default.url} alt={`thumbnail for ${channel.title}`} /><br />
        <Link to={`/channel/${channel.channelId}`} className='link-channel'>
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

export default LandingList;
