import React, { Component } from 'react';
import SearchApiService from '../../services/search-api-service';
import YTContext from '../../contexts/YTContext';
import topicIds from './channel-helper';
import AddReview from '../AddReview/addreview';
import AddRating from '../AddRating/addrating';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faStar, faCheckSquare, faCaretDown } from '@fortawesome/free-solid-svg-icons'
import { faStar as farstar, faSmile } from '@fortawesome/free-regular-svg-icons'

import './Channel.css';
class Channel extends Component {
  constructor(props) {
    super(props);
    this.state = {
      id: props.id
    };
  }
  static contextType = YTContext;

  componentDidMount() {
    if (this.context.activeChannel === null) {
      console.log(this.props.id)
      SearchApiService.ChannelsDirtyDetails(this.props.id)
        .then(res => {
          this.context.setActiveChannel(res.items[0])
        })
    }
  }

  componentWillUnmount() {
    this.context.setActiveChannel(null)
  }

  render() {
    let topicDetails
    if (this.context.activeChannel) {
      topicDetails = this.context.activeChannel.topicDetails.topicIds.map(topic => {
        return topicIds[topic] ? topicIds[topic] : topic
      })
    }
    
    return (
      <>
       {this.context.activeChannel &&
        <main role='main' className='channel_main'>
          <div  className='landing_main_banner'>
          <section>
            <div className='channel_header'>
              <div className='channel_image'>
                <img alt='logo' src={this.context.activeChannel.snippet.thumbnails.default.url}/>
              </div>
              <h2 className='channel_title'>
              {this.context.activeChannel.snippet.title}
              </h2>
              <div className='channel_rating' >
                <FontAwesomeIcon icon={faStar} style={{ color: '#EF1362' }}   />
                <FontAwesomeIcon icon={faStar} style={{ color: '#EF1362' }}   />
                <FontAwesomeIcon icon={faStar} style={{ color: '#EF1362' }}   />
                <FontAwesomeIcon icon={faStar} style={{ color: '#EF1362' }}   />
                <FontAwesomeIcon icon={faStar} style={{ color: '#EF1362' }}   />

              </div>
            </div>
          </section>
          </div>



          <section className='channel_main_body'>
            <div className='left_col'> 


      
            <div className='about' > 
                 About
                </div>

                <div className='channel_description' > 
                  {this.context.activeChannel.snippet.description}
                </div>


            <div className='channel_col_headers' >
            What People Are Saying
            </div>

            <div>
              <AddReview />
            </div>

            <div className='channel_col_headers' >
             Add a Rating
            </div>

            <div>
              <AddRating />
            </div>

            </div>
            <div className='right_col'>

              <div className='right_col_top_box'>
              Total Videos: {this.context.activeChannel.statistics.videoCount}

              </div>

              <div className='right_col_top_box'>
              Comment Count: {this.context.activeChannel.statistics.commentCount}

              </div>


              <div className='right_col_top_box'>
              Keywords: {this.context.activeChannel.brandingSettings.channel.keywords}
              Total Views: {this.context.activeChannel.statistics.viewCount}
              Subscribers: {this.context.activeChannel.statistics.subscriberCount}
              Topics: {topicDetails.join(', ')}
              </div>

              <div className='right_col_top_box'>
              <a href={`http://www.youtube.com/channel/${this.props.id}`} target='blank'>Link</a>

              </div>

             
            </div>
          </section>



        </main>
       }
      </>
    );
  }
}

export default Channel;