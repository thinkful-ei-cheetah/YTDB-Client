import React, { Component } from 'react';
import FavoriteApiService from '../../services/favorite-api-service';
import { Link } from 'react-router-dom';
import config from '../../config';
import TokenService from '../../services/token-service';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faStar,
  faCheckSquare,
  faCaretDown
} from '@fortawesome/free-solid-svg-icons';
import { faStar as farstar } from '@fortawesome/free-regular-svg-icons';
import YTContext from '../../contexts/YTContext';
import DashboardList from './DashboardList';
import './Dashboard.css';

const KEY = process.env.REACT_APP_YTAPI;

class Dashboard extends Component {
  static contextType = YTContext;

  componentDidMount() {
    FavoriteApiService.getFavorites().then(favorites => {
      this.context.setFavorites(favorites);
    });
  }

  render() {
    let results = this.context.favorites.map(favorite => {
      return (
        <div key={favorite.id}>
          <DashboardList favorite={favorite} />
        </div>
      );
    });

    return (
      <>
        <h2> My Favorites </h2>
        <div className='results_container'>{results}</div>
      </>
    );
  }
}

export default Dashboard;
