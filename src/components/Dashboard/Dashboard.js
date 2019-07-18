import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import config from '../../config';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faStar, faCheckSquare, faCaretDown } from '@fortawesome/free-solid-svg-icons'
import { faStar as farstar } from '@fortawesome/free-regular-svg-icons'
import YTContext from '../../contexts/YTContext';
import DashboardList from './DashboardList'
import FavoritesService from '../../services/favorites-service';
import './Dashboard.css';

const KEY = process.env.REACT_APP_YTAPI;

class Dashboard extends Component {
  static contextType = YTContext;
  
  componentDidMount = async() => {
    const favorites = await FavoritesService.getFavorites();
    
    this.context.setFavorites(favorites);
  }

  render() {
    let results = this.context.favorites.map(favorite => {
      return <div className='ind_results' key={favorite.channelId}>
        <DashboardList favorite={favorite} />
      </div>
    })
    
    return (
      
        
        <div className='results_container_dashboard'>
          <div className='results_container_flex'>

          <h2> My Favorites </h2>
            { results }

          </div>

        </div>
     
    );
  }
}

export default Dashboard;