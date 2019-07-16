import React, { Component } from 'react';
import YTContext from '../../contexts/YTContext';
import ReviewsService from '../../services/reviews-service';

class AddReview extends Component {
  
  constructor(props) {
    super(props);
    this.handleSubmitReview = this.handleSubmitReview.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.state = {
      value: 'Please leave a review.',
      reviews: [],
      userReview: false,
    };
  }

  static contextType = YTContext;

  componentDidMount = async() => {
    console.log(this.props.id)
    await ReviewsService.getReviews(this.props.id)
      .then(res => this.updateReviews(res))
      .catch(err => console.log(err))

    this.sortReviews(this.state.reviews);
  }

  sortReviews = (arr) => {

  }

  deleteReview() {
    //toggle
    //send info to router
  }

  componentWillUnmount() {
    if (this.state.userReview) { this.toggleReviewedByUser() };
  }

  toggleReviewedByUser() {
    const { userReview } = this.state;
    this.setState({ userReview: !userReview })
  }

  updateReviews = (arr) => {
    console.log(arr)
    this.setState({
      reviews: arr.response
    })
  }

  handleChange = (event) => {
    this.setState({value: event.target.value});
  }

  handleSubmitReview = event => {
    event.preventDefault();
    const { search } = event.target;
    ReviewsService.addReview(this.state.value, this.props.id);
    console.log('adding review')
  };

  handleEnter = event => {
    if (event.keyCode === 13) {
      event.preventDefault();
      document.getElementById('submit').click();
    }
  }

  render() {
    return <div>
      
      {(this.state.reviews.length > 0)
        ? this.state.reviews.map((review) =>{
          return <div key={review.id}>{review.id} left a review at {review.date_created} {review.text}</div>
        })
        :<span>no reviews</span>
      }

      <form
        onSubmit={event => this.handleSubmitReview(event)}
      >
        <textarea 
          value={this.state.value} 
          onChange={this.handleChange} 
          onKeyUp={event => this.handleEnter(event)} 
        />

        <button id='submit' type='submit'>
          Submit
        </button>
      </form>
    </div>
  }  
}

export default AddReview;