import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import config from '../../config';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faStar, faCheckSquare, faCaretDown } from '@fortawesome/free-solid-svg-icons'
import { faStar as farstar, faSmile} from '@fortawesome/free-regular-svg-icons'
import axios from 'axios';
import SearchApiService from '../../services/search-api-service'
import YTContext from '../../contexts/YTContext';
import LandingList from './LandingList'
import topicIds from '../Channel/channel-helper'
import './Landing.css';

const KEY = process.env.REACT_APP_YTAPI;

class Landing extends Component {
 
    constructor(props) {
        super(props);
        this.handleSubmit = this.handleSubmit.bind(this);
      }

    // handleSubmit = async () => {
       
    //     axios.get('https://www.googleapis.com/youtube/v3/search', {
    //         params: {
    //             q: 'The Onion',
    //             part: 'snippet',
    //             maxResults: 5,
    //             key: KEY,
    //             type: 'channel'
    //         }
    //       }).then(res => {
    //         console.log(res)
    //       })

    // }
  static contextType = YTContext;
  firstInput = React.createRef();

  handleSubmit = event => {
    event.preventDefault();
    const { search } = event.target;
    if(this.context.topicSelect !== null || this.context.topicSelect !== ''){
      SearchApiService.SearchChannelsByTopic(search.value, this.context.topicSelect)
      .then(results => {
        let filteredResults = results.items.map(item => {
          return item.snippet
        })
        this.context.setChannels(filteredResults)
      })
    }
    else{
      SearchApiService.SearchChannels(search.value)
      .then(results => {
        let filteredResults = results.items.map(item => {
          return item.snippet
        })
        this.context.setChannels(filteredResults)
      })
    }
  };

  handleTopic = event => {
    this.context.setTopicSelect(event.target.value)
  }

  componentDidMount() {
    this.firstInput.current.focus();
    this.context.setActiveChannel(null)
    this.context.setTopicSelect(null)
  }

  render() {
    let results = this.context.channels.map(channel => {
      return <div key={channel.channelId}>
          <LandingList channel={channel} />
        </div>
    })
    let topics = []
    Object.entries(topicIds).forEach(
      ([key, value]) => topics.push(<option value={key}>{value}</option>)
    );
    return (
      <div className='landing_container'>
        {/* <button onClick={e => this.handleSubmit(e)}>
          Activate Lasers
        </button> */}
        <div className='landing_select_container'>
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
          <form
            className='search_form'
            onSubmit={event => this.handleSubmit(event)}
          >
            <input
              placeholder='Search'
              name='search'
              id='search-input'
              required
              ref={this.firstInput}
              className='keyword_input'
            />
            <button className='search-submit' type='submit'>
              Submit
            </button>
          </form>
        </div>
        {results}
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
