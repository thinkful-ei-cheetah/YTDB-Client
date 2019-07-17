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
          };
      }


    static contextType = YTContext;
    
    changeRating = async ( newRating, name ) => {
      if (!TokenService.hasAuthToken()) {
        console.log('Please sign in to leave a rating');
        return;
      }
      
      let rating = {
        rating: newRating,
        channelId: name,
      }
      
      await RatingsService.addRating(rating)
      console.log(newRating, name)
      let activeChannel = await SearchApiService.ChannelsDirtyDetails(this.props.id)
      console.log('activeChannel =====>', activeChannel)
      let avgRating = activeChannel.data.rating_total / activeChannel.data.rating_count
      activeChannel.data.avgRating = avgRating
      console.log('activeChannel + avgRating =====>', activeChannel)
      // this.context.setActiveChannel(null);
      await this.context.setActiveChannel(activeChannel.data);
    }

    render() {
        return <StarRatings
        rating={this.state.rating}
        starRatedColor="rgb(239,19,99)"
        starHoverColor="rgb(239,19,99)"
        changeRating={this.changeRating}
        numberOfStars={5}
        name={this.context.activeChannel.id}
      />
    }  
}

export default AddRating;