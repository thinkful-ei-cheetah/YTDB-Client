import React, { Component } from 'react';
import SearchApiService from '../../services/search-api-service'
import YTContext from '../../contexts/YTContext';
import './Channel.css';
class Channel extends Component {
  // constructor(props) {
  //   super(props);
  //   this.state = {
  //     id: props.id
  //   };
  // }
  static contextType = YTContext;

  componentDidMount(){
    if(this.context.activeChannel === null){
      
    }
  }

  render() {

    return (
      <>
       {this.props.channel.snippet &&
        <main role='main' className='channel_main'>
          <section>
            <img alt='logo' src={this.props.channel.snippet.thumbnails.medium.url}/>
            <h2 className='channel_meta_data long_form'>
            {this.props.channel.snippet.title}
            </h2>
          </section>
          <section>
            <div>
              <p className='channel_meta_data'>Total Videos: {this.props.channel.statistics.videoCount}</p>
              <p className='channel_meta_data'>Comment Count: ((waiting))</p>
            </div>
            <div>
              <p className='channel_meta_data'>Average Rating ((waiting))</p>
              <p className='channel_meta_data'>Keywords ((waiting))</p>
            </div>
            <div>
              <p className='channel_meta_data'>Total Views {this.props.channel.statistics.viewCount}</p>
              <p className='channel_meta_data'>Links ((waiting))</p>
            </div>
            <div>
              <p className='channel_meta_data'>Subscribers: {this.props.channel.statistics.subscriberCount}</p>
              <p className='channel_meta_data'>Default Language</p>
            </div>
          </section>
          <section>
            <div>
              <p className='channel_meta_data long_form'>  {this.props.channel.snippet.description}</p>
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
