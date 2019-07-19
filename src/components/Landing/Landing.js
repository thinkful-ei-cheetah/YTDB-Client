import React, { Component } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch, faCircleNotch } from '@fortawesome/free-solid-svg-icons'
import SearchApiService from '../../services/search-api-service'
import YTContext from '../../contexts/YTContext';
import LandingList from './LandingList'
import topicIds from '../Channel/channel-helper'
import FavoritesService from '../../services/favorites-service';
import './Landing.css';

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
    this.context.setLoading(true)
    this.context.setChannels([])
    if(this.context.prevTopicSelect !== 'none') {
      SearchApiService.SearchChannelsByTopic(this.context.prevSearchTerm, true, this.context.prevTopicSelect)
      .then(results => {
        this.context.setChannels(results.data)
        this.context.setLoading(false)
        return this.context.setYtdbOption(false)
      })
    } else {
      SearchApiService.SearchChannels(this.context.prevSearchTerm, true)
      .then(results => {
        this.context.setChannels(results.data)
        this.context.setLoading(false)
        return this.context.setYtdbOption(false)
      })
    }
  }

  componentDidMount = async() => {

    const favorites = await FavoritesService.getFavorites();
    this.context.setFavorites(favorites);

    this.context.setLoading(false)
    this.firstInput.current.focus();
    this.context.setSearchTerm('')
    this.context.setTopicSelect('none')
    this.context.setActiveChannel(null)
    this.context.setYtdbOption(false)
  }

  render() {
    let results = this.context.channels.map(channel => {
      return <div  className='ind_results' key={channel.yt_id}>
          <LandingList channel={channel} />
        </div>
    })
    results = <div className='results_container'>{results}</div>
    let topics = []
    Object.entries(topicIds).forEach(
      ([key, value]) => topics.push(<option key={key} value={key}>{value}</option>)
    );

    let ytSearch = { display: this.context.ytdbOption ? "block" : "none" }
    let dummy = this.context.ytdbOption ? "block" : "none" ;

    return (
      <div className='landing_container'>
        <div className='landing_main_banner'>
          <h3>RATE AND REVIEW YOUR FAVORITE YOUTUBE CHANNEL</h3>

          <form
            onSubmit={event => this.handleSubmit(event)}
            className='search-form'
            id='search-form'
          >
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

          { (dummy==='none') ? <div className="dummy"></div> : null }

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