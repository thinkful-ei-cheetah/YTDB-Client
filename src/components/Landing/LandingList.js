import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import YTContext from '../../contexts/YTContext';

class LandingList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      favorited: false,
    };
  }

  static contextType = YTContext;

  componentDidMount() {
    this.handleFavorite();
  }

  handleFavorite() {
    const channel = this.props.channel;
    const favorites = this.context.favorites;

    for (let i = 0; i < favorites.length; i++)
      if (channel.yt_id === favorites[i].yt_id) {
        this.isFavorite();
      }
  }

  isFavorite() {
    this.setState({ favorited: true })
  }

  isNotFavorite() {
    this.setState({ favorited: false })
  }

  addFavorite(channel) {
    this.context.addFavorite(channel);
    this.isFavorite();
  }

  removeFavorite(channel) {
    this.context.removeFavorite(channel);
    this.isNotFavorite();
  }

  render() {
    let channel = this.props.channel
    return (
      <div className='ind_results'>

        <div className='ind_results_top'>
        
          <Link to={`/channel/${channel.yt_id}`} className='link-channel'>
            <img src={channel.thumbnail} alt={`thumbnail for ${channel.title}`} /><br />
          </Link>

        <div className='ind_results_channel_right_top'>
          <div className='ind_results_channel_title'>
            <Link to={`/channel/${channel.yt_id}`} className='link-channel'>
            {channel.title}
            </Link>
            </div>

            <div className='ind_results_channel_description'>
              {channel.description}
            </div>
          </div>
        </div>
        <div className='ind_results_bottom'>
          <button 
            onClick={this.state.favorited ?
              () => this.removeFavorite(channel)
              : () => this.addFavorite(channel) 
            }>
              {this.state.favorited ? 
                  'Remove Favorite' 
                  : 'Add Favorite'
              }
          </button>
        </div>
      </div>
    );
  }
}

export default LandingList;