import React, { Component } from 'react';
import YTContext from '../../contexts/YTContext';
import DashboardList from './DashboardList'
import FavoritesService from '../../services/favorites-service';
import TokenService from '../../services/token-service';
import './Dashboard.css';

class Dashboard extends Component {
  static contextType = YTContext;
  
  componentDidMount = async() => {
    if (TokenService.hasAuthToken()) {
      const favorites = await FavoritesService.getFavorites();
      this.context.setFavorites(favorites);
    }
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