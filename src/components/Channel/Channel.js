import React, { Component } from 'react';
import SearchApiService from '../../services/search-api-service'
import YTContext from '../../contexts/YTContext';
import topicIds from './channel-helper'
import './Channel.css';
class Channel extends Component {
  constructor(props) {
    super(props);
    this.state = {
      id: props.id
    };
  }
  static contextType = YTContext;

  componentDidMount(){
    if(this.context.activeChannel === null){
      console.log(this.props.id)
      SearchApiService.ChannelsDirtyDetails(this.props.id)
        .then(res => {
          this.context.setActiveChannel(res.items[0])
        })
    }
  }

  componentWillUnmount(){
    this.context.setActiveChannel(null)
  }

  render() {
    let topicDetails
    if(this.context.activeChannel){
      topicDetails = this.context.activeChannel.topicDetails.topicIds.map(topic => {
        return topicIds[topic] ? topicIds[topic] : topic
      })
    }
    return (
      <>
       {this.context.activeChannel &&
        <main role='main' className='channel_main'>
          <section>
            <img alt='logo' src={this.context.activeChannel.snippet.thumbnails.default.url}/>
            <h2 className='channel_meta_data long_form'>
            {this.context.activeChannel.snippet.title}
            </h2>
          </section>
          <section>
            <div>
              <p className='channel_meta_data'>Total Videos: {this.context.activeChannel.statistics.videoCount}</p>
              <p className='channel_meta_data'>Comment Count: {this.context.activeChannel.statistics.commentCount}</p>
            </div>
            <div>
              <p className='channel_meta_data'>Average Rating ((waiting))</p>
              <p className='channel_meta_data'>Keywords: {this.context.activeChannel.brandingSettings.channel.keywords}</p>
            </div>
            <div>
              <p className='channel_meta_data'>Total Views: {this.context.activeChannel.statistics.viewCount}</p>
              <p className='channel_meta_data'><a href={`http://www.youtube.com/channel/${this.props.id}`} target='blank'>Link</a></p>
            </div>
            <div>
              <p className='channel_meta_data'>Subscribers: {this.context.activeChannel.statistics.subscriberCount}</p>
              <p className='channel_meta_data'>Topics: {topicDetails.join(', ')}</p>
              {/* <p className='channel_meta_data'>Default Language</p> */}
            </div>
          </section>
          <section>
            <div>
              <p className='channel_meta_data long_form'>  {this.context.activeChannel.snippet.description}</p>
            </div>
            <div>
              <p className='channel_meta_data long_form'>Reviews: ((waiting))</p>
            </div>
          </section>
        </main>
       }
      </>
    );
  }
}

export default Channel;