import React, { Component } from 'react';
import YTContext from '../../contexts/YTContext';
import StarRatings from 'react-star-ratings';
import RatingsService from '../../services/ratings-service';
import TokenService from '../../services/token-service';

class AddRating extends Component {
  
    constructor(props) {
        super(props);
        this.state = {
            rating: 0,
          };
      }


    static contextType = YTContext;
    
    changeRating( newRating, name ) {
      if (!TokenService.hasAuthToken()) {
        console.log('Please sign in to leave a rating');
        return;
      }
      
      let rating = {
        rating: newRating,
        channelId: name,
      }
      
      RatingsService.addRating(rating);
      console.log(newRating, name)
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