import React, { Component } from 'react';
import YTContext from '../../contexts/YTContext';
import StarRatings from 'react-star-ratings';
import RatingsService from '../../services/ratings-service';
import TokenService from '../../services/token-service';
import SearchApiService from '../../services/search-api-service';

class AddRating extends Component {
    constructor(props) {
        super(props);
        this.state = {
            rating: 0,
            error: null,
          };
      }

    static contextType = YTContext;

    componentWillUnmount() {
      this.setState({ error: null })
    }
    
    changeRating = async ( newRating, name ) => {
      if (!TokenService.hasAuthToken()) {
        this.setError('Please sign in to leave a rating');
        return;
      }
      
      let rating = {
        rating: newRating,
        channelId: name,
      }
      
      await RatingsService.addRating(rating)
      let activeChannel = await SearchApiService.ChannelsDirtyDetails(this.props.id)
      let avgRating = activeChannel.data.rating_total / activeChannel.data.rating_count
      if (isNaN(avgRating)) {
        avgRating=0;
      }

      activeChannel.data.avgRating = avgRating
      if(TokenService.hasAuthToken()){
        let userRating = await SearchApiService.getUserReview(activeChannel.data.id)
        activeChannel.data.userRating = userRating.rating
      }
      
      await this.context.setActiveChannel(activeChannel.data);
      if(this.context.channels.length){
        let newChannels = this.context.channels
        newChannels.forEach((channel, index) => {
          if(channel.yt_id === this.context.activeChannel.yt_id){
            newChannels[index] = this.context.activeChannel
          }
        })
        await this.context.setChannels(newChannels)
      }
    }

    setError = async (str) => {
      await this.setState({
        error: str
      })
    }

    render() {
        let kluge = this.context.activeChannel.id.toString();
        let rating = 0
        let { error } = this.state;
        if(!(this.context.activeChannel.userRating === undefined)){
          rating = this.context.activeChannel.userRating
        }
        
        return (
          <>
            <div role='alert'>
              {error && <p className='form-error'>{error}</p>}
            </div>

            <StarRatings
            rating={rating}
            starRatedColor="rgb(239,19,99)"
            starHoverColor="rgb(239,19,99)"
            changeRating={this.changeRating}
            numberOfStars={5}
            name={kluge}
            starDimension="30px"
            />
          </>
        )
    }  
}

export default AddRating;