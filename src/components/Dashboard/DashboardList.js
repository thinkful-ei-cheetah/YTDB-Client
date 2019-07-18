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
      <div className='ind_results_top'>
        <Link to={`/channel/${favorite.yt_id}`} className='link-channel'>
          <img src={favorite.thumbnail} alt={`thumbnail for ${favorite.title}`} /><br />
        </Link>
        <div className='ind_results_channel_right_top'>
          <div className='favorite_button'>     
            <Button className='button' onClick={ () => this.context.removeFavorite(favorite) }>
              Remove
            </Button>
          </div>

          <div className='ind_results_channel_title'>
            <Link to={`/channel/${favorite.yt_id}`} className='link-channel' >
              {favorite.title}
            </Link>
          </div>

          <div className='ind_results_channel_description'>
            {favorite.description}
          </div>
        </div>
      </div>
    );
  }
}

export default DashboardList;