import React, { Component } from 'react';
import './Channel.css';
class Channel extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    return (
      <>
        <main role='main' className='channel_main'>
          <section>
            <img alt='logo' src={this.props.channel.avatar} />
            <h2 className='channel_meta_data long_form'>
              {this.props.channel.channel_name}
            </h2>
          </section>
          <section>
            <div>
              <span className='channel_meta_data'>Total Videos:</span>
              <span className='channel_meta_data'>Comment Count</span>
            </div>
            <div>
              <span className='channel_meta_data'>Average Rating</span>
              <span className='channel_meta_data'>Keywords</span>
            </div>
            <div>
              <span className='channel_meta_data'>Total Views</span>
              <span className='channel_meta_data'>Links</span>
            </div>
            <div>
              <span className='channel_meta_data'>Subs</span>
              <span className='channel_meta_data'>Default Language</span>
            </div>
          </section>
          <section>
            <div>
              <p className='channel_meta_data long_form'>Descriptions</p>
            </div>
            <div>
              <p className='channel_meta_data long_form'>Reviews</p>
            </div>
          </section>
        </main>
      </>
    );
  }
}

export default Channel;
