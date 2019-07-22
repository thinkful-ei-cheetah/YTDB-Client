import React, { Component } from 'react';
import SearchApiService from '../../services/search-api-service';
import YTContext from '../../contexts/YTContext';
import AddReview from '../AddReview/addreview';
import AddRating from '../AddRating/addrating';
import StarRatings from 'react-star-ratings';
import UserContext from '../../contexts/UserContext';
import Button from '../Button/Button';
import TokenService from '../../services/token-service';
import './Channel.css';

class Channel extends Component {
  constructor(props) {
    super(props);
    this.state = {
      id: props.id,
      rating: 0,
      favorited: false,
    };
  }
  static contextType = YTContext;

  componentDidMount = async () => {
    if (this.context.activeChannel === null) {
      let activeChannelDetails = await SearchApiService.ChannelsDirtyDetails(this.props.id)
      let avgRating = activeChannelDetails.data.rating_total / activeChannelDetails.data.rating_count
      if (isNaN(avgRating)) {
        avgRating=0;
      }

      activeChannelDetails.data.avgRating = avgRating
      if (TokenService.hasAuthToken()) {
        let userRating = await SearchApiService.getUserReview(activeChannelDetails.data.id)
        activeChannelDetails.data.userRating = userRating.rating
      }
      this.context.setActiveChannel(activeChannelDetails.data);
    };
    this.handleFavorite();
  };

  calculateAvg() {
    let rating = this.context.activeChannel.rating_total / this.context.activeChannel.rating_count;
    if (rating) {
      this.setState({
        rating,
      })
    }
  }

  handleFavorite() {
    const id = this.state.id;
    const favorites = this.context.favorites;
    for (let i = 0; i < favorites.length; i++)
      if (id === favorites[i].yt_id) {
        this.isFavorite();
      }
  }

  isFavorite() {
    this.setState({ favorited: true })
  }

  isNotFavorite() {
    this.setState({ favorited: false })
  }

  addFavorite(channel) {
    if (TokenService.hasAuthToken()) {
      this.context.addFavorite(channel);
      this.isFavorite();
    }
  }

  removeFavorite(channel) {
    if (TokenService.hasAuthToken()) {
      this.context.removeFavorite(channel);
      this.isNotFavorite();
    }
  }

  componentWillUnmount() {
    this.context.setActiveChannel(null);
  }

  render() {
    return (
      <>
        {this.context.activeChannel && (
          <main role='main' className='channel_main'>
            <div className='landing_main_banner'>
              <section>
                <div className='channel_header'>
                  <div className='left_col_header'>
                    <div className='channel_image'>
                      <img
                        alt='logo'
                        src={this.context.activeChannel.thumbnail}
                      />
                    </div>
                    <h2 className='channel_title'>
                      {this.context.activeChannel.title}
                    </h2>
                  </div>
                  <div className='channel_rating'>
                    {/* <div>Rating: {this.context.activeChannel.avgRating}</div> */}
                    <StarRatings
                      rating={this.context.activeChannel.avgRating}
                      starRatedColor='rgb(239,19,99)'
                      starHoverColor='rgb(239,19,99)'
                      numberOfStars={5}
                      name='rating'
                      starDimension="40px"
                    />
                  </div>
                </div>
              </section>
            </div>

            <section className='channel_main_body'>
              <div className='left_col'>
                <div>

                </div>
                <div className='about'>About</div>
                <div className='channel_description'>
                  {this.context.activeChannel.description}
                </div>
                <div className='about'>
                  What People Are Saying
                </div>
                <div className="add_rating_review">
                  <UserContext.Consumer>
                    {userContext =>
                      <AddReview reviews={this.state.reviews} username={userContext.user.username} id={this.props.id} />
                    }
                  </UserContext.Consumer>
                </div>

                <div className='about'>
                  Add a Rating
                </div>

                <div className="add_rating_review">
                  <AddRating 
                    id={this.props.id}
                    calculateAvg={this.calculateAvg}
                    class="small"
                  />
                </div>
              </div>
              <div className='right_col'>
              <div className='right_col_top_box'>
                <Button className='button widebutton' onClick={this.state.favorited ?
                        () => this.removeFavorite(this.context.activeChannel)
                        : () => this.addFavorite(this.context.activeChannel)
                      }>
                      {this.state.favorited ?
                        'Remove Favorite'
                        : 'Add Favorite'
                      }
                </Button>
                </div>

                <div className='right_col_top_box'>
                  Total Videos: {this.context.activeChannel.total_videos}
                </div>

                <div className='right_col_top_box'>
                  Comment Count:{' '}
                  {this.context.activeChannel.comment_count}
                </div>

                <div className='right_col_top_box'>
                  <ul>
                    <li>
                      <b>Keywords</b>: {this.context.activeChannel.keywords.join(', ')}
                    </li>
                    <li>
                      <b>Total Views</b>: {this.context.activeChannel.view_count}
                    </li>
                    <li>
                      <b>Subscribers</b>: {this.context.activeChannel.subscriber_count}
                    </li>
                    <li>
                      <b>Topics</b>: {this.context.activeChannel.topics.join(', ')}
                    </li>
                  </ul>
                </div>

                <div className='right_col_top_box'>
                  {/* <a
                    href={`http://www.youtube.com/channel/${
                      this.context.activeChannel.yt_id
                    }`}
                    target='blank'
                  >
                    Go to Channel
                  </a> */}
                  <a
                    href={`http://www.youtube.com/channel/${
                      this.context.activeChannel.yt_id
                    }`}
                    target='blank'
                  >
                    <button type="button" className='button'>
                      Go to Channel
                    </button>
                  </a>
                </div>
              </div>
            </section>
          </main>
        )}
      </>
    );
  }
}

export default Channel;