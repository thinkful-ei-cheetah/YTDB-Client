import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import YTContext from '../../contexts/YTContext';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart} from '@fortawesome/free-solid-svg-icons'
import TokenService from '../../services/token-service';
import StarRatings from 'react-star-ratings';

class LandingList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      favorited: false,
      avgRating: 0
    };
  }

  static contextType = YTContext;

  componentDidMount() {
    this.handleFavorite();
    let avgRating = this.props.channel.rating_total / this.props.channel.rating_count
    if (isNaN(avgRating)) {
      avgRating=0;
    } else {
      this.setState({ avgRating: avgRating })
    }
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
    if(TokenService.hasAuthToken()){
      this.context.addFavorite(channel);
      this.isFavorite();
    }
  }

  removeFavorite(channel) {
    if (TokenService.hasAuthToken()) {
      this.context.removeFavorite(channel);
      this.isNotFavorite();
    }
  }

  render() {
    let channel = this.props.channel

    return (
      <div>
        <div className='ind_results_top'>
          <Link to={`/channel/${channel.yt_id}`} className='link-channel'>
            <img src={channel.thumbnail} alt={`thumbnail for ${channel.title}`} /><br />
          </Link>

          <div className='favoriate_results_channel_right_top'>
            <div className='ind_results_channel_title'>
              <Link to={`/channel/${channel.yt_id}`} className='link-channel' >
              {channel.title}
              </Link>
              </div>

              <div className='ind_results_channel_description'>
                {channel.description}
              </div>
          </div>
        </div>
        <div className='ind_results_bottom'>



          <div className="bottom_favorite">

            {this.state.favorited ?
              <FontAwesomeIcon 
                icon={faHeart} 
                size="2x" 
                color="rgb(247, 5, 103)" 
                className="bottom_favorite"
                onClick={() => this.removeFavorite(channel)} 
              />
              :
              <FontAwesomeIcon
                icon={faHeart}
                size="2x"
                color="#ccc"
                className="bottom_favorite" 
                onClick={() => this.addFavorite(channel)} 
              />
            } 

          </div>
          <div className="bottom_stars">
            <StarRatings
              rating={this.state.avgRating}
              starRatedColor='rgb(239,19,99)'
              starHoverColor='rgb(239,19,99)'
              numberOfStars={5}
              name='rating'
              starDimension="25px"
            />
          </div>
        </div>
      </div>
    );
  }
}

export default LandingList;