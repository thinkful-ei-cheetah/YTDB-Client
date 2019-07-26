import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import YTContext from '../../contexts/YTContext';
import Button from '../Button/Button';

class DashboardList extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  static contextType = YTContext;

  render() {
    let favorite = this.props.favorite

    return (
      <div className='fav_results'>
        <div className='ind_results_top col col-1'>
          <Link to={`/channel/${favorite.yt_id}`} className='link-channel'>
            <img src={favorite.thumbnail} alt={`thumbnail for ${favorite.title}`} className='thumbnail' /><br />
          </Link>
        </div>
        <div className='favorite_results_channel_right_top col col-2'>
          <div className='row fav-channel-title-button-wrapper'>
            <div className='ind_results_channel_title col'>
              <Link to={`/channel/${favorite.yt_id}`} className='link-channel' >
                {favorite.title}
              </Link>
            </div>
            <div className='favorite_button col'>     
              <Button className='button' onClick={ () => this.context.removeFavorite(favorite) }>
                Remove
              </Button>
            </div>
          </div>
          <div className='row'>
            <div className='ind_results_channel_description col'>
              {favorite.description}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default DashboardList;