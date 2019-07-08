import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import config from '../../config';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faStar, faCheckSquare, faCaretDown } from '@fortawesome/free-solid-svg-icons'
import { faStar as farstar, faSmile } from '@fortawesome/free-regular-svg-icons'
import axios from 'axios';
import SearchApiService from '../../services/search-api-service'
import YTContext from '../../contexts/YTContext';
import DashboardList from './DashboardList'
import topicIds from '../Channel/channel-helper'
import './Dashboard.css';

const KEY = process.env.REACT_APP_YTAPI;

class Dashboard extends Component {
    render() {
        // let results = this.context.channels.map(channel => {
        //     return <div key={channel.channelId}>
        //         <DashboardList channel={channel} />
        //     </div>
        // })
        let test = [{channelId: 'test'}];
        let results = test.map(channel => {
            return <div key={channel.channelId}>
                <DashboardList channel={channel} />
            </div>
        })
        
        return (
            <>
                <h2> My Favorites </h2>
                <div className='results_container'>

                    {results}

                </div>
            </>
        );
    }

}


export default Dashboard;