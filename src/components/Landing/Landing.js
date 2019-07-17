import React, { Component } from 'react';
// import { Link } from 'react-router-dom';
// import config from '../../config';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch, faCircleNotch } from '@fortawesome/free-solid-svg-icons'
// import { faStar, faCheckSquare, faCaretDown } from '@fortawesome/free-solid-svg-icons';
// import { faStar as farstar, faSmile} from '@fortawesome/free-regular-svg-icons';
// import axios from 'axios';
import SearchApiService from '../../services/search-api-service'
import YTContext from '../../contexts/YTContext';
import LandingList from './LandingList'
// import Autocomplete from "../Autocomplete/Autocomplete";
import topicIds from '../Channel/channel-helper'
import Button from '../Button/Button';
import { Input } from '../Form/Form';
import FavoritesService from '../../services/favorites-service';

import './Landing.css';

// const KEY = process.env.REACT_APP_YTAPI;

class Landing extends Component {
  constructor(props) {
    super(props);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  static contextType = YTContext;
  firstInput = React.createRef();

  handleSubmit = (event) => {
    event.preventDefault();
    this.context.setChannels([])
    // const { search } = event.target;
    let searchTerm = this.context.searchTerm
    this.context.setPrevSearchTerm(searchTerm)
    this.context.setPrevTopicSelect(this.context.topicSelect)
    this.context.setSearchTerm('')
    if(this.context.topicSelect !== 'none') {
      SearchApiService.SearchChannelsByTopic(searchTerm, false, this.context.topicSelect)
      .then(results => {
        const filteredData = results.data.reduce((acc, current) => {
          const x = acc.find(channel => channel.yt_id === current.yt_id);
          if (!x) {
            return acc.concat([current]);
          } else {
            return acc;
          }
        }, []);
        this.context.setChannels(filteredData)
        return this.context.setYtdbOption(true)
      })
    }
    else {
      SearchApiService.SearchChannels(searchTerm, false)
      .then(results => {
        const filteredData = results.data.reduce((acc, current) => {
          const x = acc.find(channel => channel.yt_id === current.yt_id);
          if (!x) {
            return acc.concat([current]);
          } else {
            return acc;
          }
        }, []);
        this.context.setChannels(filteredData)
        return this.context.setYtdbOption(true)
      })
    }
  };

  handleTopic = event => {
    this.context.setTopicSelect(event.target.value)
  }

  handleYtdbSearch = () => {
    console.log('handleYtdbSearch ran')
    this.context.setLoading(true)
    this.context.setChannels([])
    if(this.context.prevTopicSelect !== 'none') {
      SearchApiService.SearchChannelsByTopic(this.context.prevSearchTerm, true, this.context.prevTopicSelect)
      .then(results => {
        this.context.setChannels(results.data)
        this.context.setLoading(false)
        return this.context.setYtdbOption(false)
      })
    }
    else {
      SearchApiService.SearchChannels(this.context.prevSearchTerm, true)
      .then(results => {
        this.context.setChannels(results.data)
        this.context.setLoading(false)
        return this.context.setYtdbOption(false)
      })
    }
  }

  componentDidMount = async() => {
    this.context.setLoading(false)
    this.firstInput.current.focus();
    this.context.setSearchTerm('')
    this.context.setTopicSelect('none')
    this.context.setActiveChannel(null)
    this.context.setYtdbOption(false)
   // const favorites = await FavoritesService.getFavorites();
   // this.context.setFavorites(favorites);
  }

  render() {
    let results = this.context.channels.map(channel => {
      return <div key={channel.yt_id}>
          <LandingList channel={channel} />
        </div>
    })
    results = <div className='results_container'>{results}</div>
    let topics = []
    Object.entries(topicIds).forEach(
      ([key, value]) => topics.push(<option key={key} value={key}>{value}</option>)
    );
    let ytSearch = { display: this.context.ytdbOption ? "block" : "none" }
    // let whichDb = this.context.useYtdb ? `Youtube's db` : `Our db`
    return (
      <div className='landing_container'>
        <div className='landing_main_banner'>
          <h3>RATE AND REVIEW YOUR FAVORITE YOUTUBE CHANNEL</h3>

          <form
            onSubmit={event => this.handleSubmit(event)}
            className='search-form'
            id='search-form'
          >
            {/* <button className='db_button' onClick={e => this.handleDbSwitch(e)}>{whichDb}</button> */}
            <select className='topic_select' defaultValue='' onChange={e => this.handleTopic(e)}>
              <option value='none'>Topics</option>
              {topics}
            </select>
            <input
              placeholder='Search'
              name='search'
              id='search-input'
              required
              ref={this.firstInput}
              value={this.context.searchTerm}
              onChange={e => this.context.setSearchTerm(e.target.value)}
              className='autocomplete'
            />
            <button 
              type='submit'
              className='button submit_button'
              id='submit-button'
              disabled={this.context.loading}
            >
              <FontAwesomeIcon icon={faSearch} />
            </button>
          </form>
          <div 
          className="not-what-you-wanted"
          style={ ytSearch }
          >
            <p>
              Not what you're looking for? 
            </p>  
            <p>  
              Try your last search with Youtube's database here {' '}
              <button 
                className='button submit_button yt_submit_button'
                onClick={() => this.handleYtdbSearch()}
                disabled={this.context.loading}
              >
                <FontAwesomeIcon icon={faSearch} />
              </button>
            </p>
          </div>
        </div>
        {this.context.loading 
          ? <FontAwesomeIcon className='loading-spinner' icon={faCircleNotch} spin /> 
          : results
        }
      </div>
    );
  }
}

export default Landing;
