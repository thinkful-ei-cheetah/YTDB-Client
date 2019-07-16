import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import config from '../../config';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar, faCheckSquare, faCaretDown } from '@fortawesome/free-solid-svg-icons';
import { faStar as farstar, faSmile} from '@fortawesome/free-regular-svg-icons';
// import axios from 'axios';
import SearchApiService from '../../services/search-api-service'
import YTContext from '../../contexts/YTContext';
import LandingList from './LandingList'
import Autocomplete from "../Autocomplete/Autocomplete";
import topicIds from '../Channel/channel-helper'
import Button from '../Button/Button';
import { Input } from '../Form/Form';

import './Landing.css';

const KEY = process.env.REACT_APP_YTAPI;

class Landing extends Component {
    constructor(props) {
        super(props);
        this.handleSubmit = this.handleSubmit.bind(this);
      }

  static contextType = YTContext;
  firstInput = React.createRef();

  handleSubmit = event => {
    event.preventDefault();
    this.context.setChannels([])
    const { search } = event.target;
    if(this.context.topicSelect !== 'none') {
      // console.log(`searching for "${search.value}", within topic "${this.context.topicSelect}"`)
      SearchApiService.SearchChannelsByTopic(search.value, this.context.useYtdb, this.context.topicSelect)
      .then(results => {
        // let filteredResults = results.items.map(item => {
        //   return item.snippet
        // })
        // this.context.setChannels(filteredResults)
        // console.log('results ======>', results.data)
        return this.context.setChannels(results.data)
      })
    }
    else {
      // console.log(`searching for "${search.value}"`)
      SearchApiService.SearchChannels(search.value, this.context.useYtdb)
      .then(results => {
        // let filteredResults = results.items.map(item => {
        //   return item.snippet
        // })
        // this.context.setChannels(filteredResults)
        // console.log('results ======>', results.data)
        return this.context.setChannels(results.data)
      })
    }
  };

  handleTopic = event => {
    this.context.setTopicSelect(event.target.value)
  }

  handleDbSwitch = event => {
    event.preventDefault()
    this.context.setUseYtdb( !this.context.useYtdb )
  }
  // this is a test

  componentDidMount() {
    this.firstInput.current.focus();
    // this.context.setChannels([])
    this.context.setActiveChannel(null)
    // this.context.setTopicSelect('none')
    // this.context.setUseYtdb( false )
  }

  render() {
    let results = this.context.channels.map(channel => {
      return <div key={channel.yt_id}>
          <LandingList channel={channel} />
        </div>
    })
    let topics = []
    Object.entries(topicIds).forEach(
      ([key, value]) => topics.push(<option key={key} value={key}>{value}</option>)
    );
    let whichDb = this.context.useYtdb ? `Youtube's db` : `Our db`
    return (
      <div className='landing_container'>
        <div className='landing_main_banner'>
          <h3>RATE AND REVIEW YOUR FAVORITE YOUTUBE CHANNEL</h3>

          <form
            onSubmit={event => this.handleSubmit(event)}
          >
            <button className='db_button' onClick={e => this.handleDbSwitch(e)}>{whichDb}</button>
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
              className='autocomplete'
            />
            <button 
              type='submit'
              className='submit_button'
            >
              Search
            </button>
          </form>
  
        </div>

        {/* <button onClick={e => this.handleSubmit(e)}>
          Activate Lasers
        </button> */}
{/*         <div className='landing_select_container'>
          <select className='category_select' defaultValue=''>
            <option value=''>
              Category
            </option>
            <option value='1'>1</option>
            <option value='2'>2</option>
          </select>
          <select className='category_select' defaultValue='' onChange={e => this.handleTopic(e)}>
            <option value=''>
              Topics
            </option>
            {topics}
          </select>

        </div> */}
        <div className='results_container'>

        {results}

        </div>
        {/* <div className='landing_boxes red_box'>
          <div className='landing_box_container'>
            <div className='landing_left_box'>
              <FontAwesomeIcon icon={faSmile} />
            </div>
            <div className='landing_right_box'>
              Channel 1 Title
              <br />
              <FontAwesomeIcon icon={faStar} />
              <FontAwesomeIcon icon={faStar} />
              <FontAwesomeIcon icon={faStar} />
              <FontAwesomeIcon icon={faStar} />
              <FontAwesomeIcon icon={farstar} />
            </div>
          </div>
        </div>
        <div className='landing_boxes blue_box'>
          <div className='landing_box_container'>
            <div className='landing_left_box'>
              <FontAwesomeIcon icon={faSmile} />
            </div>
            <div className='landing_right_box'>
              Channel 2 Title
              <br />
              <FontAwesomeIcon icon={faStar} />
              <FontAwesomeIcon icon={faStar} />
              <FontAwesomeIcon icon={farstar} />
              <FontAwesomeIcon icon={farstar} />
              <FontAwesomeIcon icon={farstar} />
            </div>
          </div>
        </div>

        <div className='landing_boxes golden_box'>
          <div className='landing_box_container'>
            <div className='landing_left_box'>
              <FontAwesomeIcon icon={faSmile} />
            </div>
            <div className='landing_right_box'>
              Channel 3 Title
              <br />
              <FontAwesomeIcon icon={faStar} />
              <FontAwesomeIcon icon={farstar} />
              <FontAwesomeIcon icon={farstar} />
              <FontAwesomeIcon icon={farstar} />
              <FontAwesomeIcon icon={farstar} />
            </div>
          </div>
        </div>
        <div className='landing_boxes green_box'>
          <div className='landing_box_container'>
            <div className='landing_left_box'>
              <FontAwesomeIcon icon={faSmile} />
            </div>
            <div className='landing_right_box'>
              Channel 4 Title
              <br />
              <FontAwesomeIcon icon={faStar} />
              <FontAwesomeIcon icon={faStar} />
              <FontAwesomeIcon icon={faStar} />
              <FontAwesomeIcon icon={faStar} />
              <FontAwesomeIcon icon={farstar} />
            </div>
          </div>
        </div> */}
      </div>
    );
  }
}

export default Landing;
