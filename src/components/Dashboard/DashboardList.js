import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import YTContext from '../../contexts/YTContext';


class DashboardList extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  static contextType = YTContext;

  render() {
    let favorite = this.props.favorite
    return (
      <div className='ind_results'>
        <h3>{favorite.title}</h3>
        <Link to={`/channel/${favorite.yt_id}`} className='link-channel'>
          <img src={favorite.thumbnail} alt={`thumbnail for ${favorite.title}`} /><br />
        </Link><br />
        <Link to={`/channel/${favorite.yt_id}`} className='link-channel'>
          <button>
            Details
          </button>
        </Link>
          <button onClick={ () => this.context.removeFavorite(favorite) }>
            Remove
          </button>
        <p>{favorite.description}</p>
      </div>
    );
  }
}

export default DashboardList;
