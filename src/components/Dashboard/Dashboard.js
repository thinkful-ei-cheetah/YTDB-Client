import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import config from '../../config';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faStar, faCheckSquare, faCaretDown } from '@fortawesome/free-solid-svg-icons'
import { faStar as farstar, faSmile } from '@fortawesome/free-regular-svg-icons'
import YTContext from '../../contexts/YTContext';
import DashboardList from './DashboardList'
import FavoritesService from '../../services/favorites-service';
import './Dashboard.css';
import UserContext from '../../contexts/UserContext';

const KEY = process.env.REACT_APP_YTAPI;

class Dashboard extends Component {
  static contextType = YTContext;
  
  componentDidMount = async() => {
    const favorites = await FavoritesService.getFavorites(this.props.id);
    
    this.context.setFavorites(favorites);
  }

  render() {
    let results = this.context.favorites.map(favorite => {
      return <div key={favorite.channelId}>
        <DashboardList favorite={favorite} />
      </div>
    })
    
    return (
      <>
        <h2> My Favorites </h2>
        <div className='results_container'>

          { results }

        </div>
      </>
    );
  }
}

export default Dashboard;