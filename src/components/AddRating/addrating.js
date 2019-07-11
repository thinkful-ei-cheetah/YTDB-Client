import React, { Component } from 'react';
import YTContext from '../../contexts/YTContext';
import StarRatings from 'react-star-ratings';
import RatingsService from '../../services/ratings-service';

class AddRating extends Component {
  
    constructor(props) {
        super(props);
        this.state = {
            rating: 0
          };
      }

      static contextType = YTContext;
      changeRating( newRating, name ) {      
        RatingsService.addRating(newRating);
        console.log(newRating, name)
      }

    render() {
        return <StarRatings
        rating={this.state.rating}
        starRatedColor="rgb(239,19,99)"
        starHoverColor="rgb(239,19,99)"
        changeRating={this.changeRating}
        numberOfStars={5}
        name='rating'
      />
    }  
}

export default AddRating;