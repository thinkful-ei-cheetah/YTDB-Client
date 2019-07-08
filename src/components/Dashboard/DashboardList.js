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
                <h3>{favorite.channelTitle}</h3>
                <img src={favorite.thumbnails.default.url} alt={`thumbnail for ${favorite.title}`} /><br />
                <Link to={`/channel/${favorite.channelId}`} className='link-channel'>
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