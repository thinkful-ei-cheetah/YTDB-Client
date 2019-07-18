import React, { Component } from 'react';
import YTContext from '../../contexts/YTContext';
import ReviewsService from '../../services/reviews-service';
import Moment from 'react-moment';
import UserContext from '../../contexts/UserContext';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleNotch } from '@fortawesome/free-solid-svg-icons';
import TokenService from '../../services/token-service';
import './addreview.css';

class AddReview extends Component {
  constructor(props) {
    super(props);
    this.handleSubmitReview = this.handleSubmitReview.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.state = {
      value: 'Please leave a review.',
      reviews: [],
      userReview: false,
      error: null,
    };
  }

  static contextType = YTContext;

  componentDidMount() {
    this.getReviews();
    if (!TokenService.hasAuthToken()) {
      this.setError('Please sign in to leave a review');
      return;
    }
  }

  componentWillUnmount() {
    this.setState({ userReview: true });
  }

  getReviews = async() => {
    await ReviewsService.getReviews(this.props.id)
      .then(res => this.sortReviews(res.response))
      .then(res => this.updateReviews(res))
      .catch(err => console.log(err))
  }

  sortReviews = (arr) => {
    const { username } = this.props;
    for (let i = 0; i < arr.length; i++) {
      if (arr[i].username === username) {
        let temp = arr[i];
        arr[i] = arr[0];
        arr[0] = temp;
        this.reviewedByUser();
        this.setText(arr[0].text);
        return arr; //can delete once server side is fixed
      }
    }
    
    return arr;
  }

  setText = async (str) => {
    this.setState({ value: str })
  }

  reviewedByUser() {
    this.setState({ userReview: true })
  }

  updateReviews = (arr) => {
    this.setState({
      reviews: arr
    })
  }

  handleChange = (event) => {
    this.setState({ value: event.target.value });
  }

  handleSubmitReview = async event => {
    event.preventDefault();
    const { userReview, value, reviews } = this.state;
    const { id } = this.props;

    userReview ? 
      await ReviewsService.editReview(value, reviews[0].id) :
      await ReviewsService.addReview(value, id);
    
    this.getReviews();
  };

  handleEnter = event => {
    if (event.keyCode === 13) {
      event.preventDefault();
      document.getElementById('submit').click();
    }
  }

  setError = async (str) => {
    await this.setState({
      error: str
    })
  }

  handleButton() {
    const { userReview: key } = this.state;
    switch(key) {
      case true: return 'Edit'
      case false: return 'Submit'
    }
  }

  render() {
    let { error } = this.state;
    let reviewDisplay = (this.state.reviews.length > 0)
    ? this.state.reviews.map((review) =>{
      return <div className="review" key={review.id}>
      <div className="review_author">
        {review.username}
      </div>
       reviewed this channel at  
      <Moment className="review_date" format="MMMM Do, Y"  >
      {review.date_created} 
      </Moment>
        <div className="review_text">
          "{review.text}"
        </div>
      </div>
    })
    : <span>no reviews</span>

    return <div>
      <UserContext.Consumer>
        {userContext =>
          userContext.user.username ?      
          <form
          onSubmit={event => this.handleSubmitReview(event)}
            >
              <textarea 
                value={this.state.value} 
                onChange={this.handleChange} 
                onKeyUp={event => this.handleEnter(event)} 
              />
              <button id='submit' type='submit'>
                {this.handleButton()}
              </button>
            </form>
          : 
          <div role='alert'>
            {error && <p className='form-error'>{error}</p>}
          </div>
        }
      </UserContext.Consumer>
      
      {this.context.loading 
        ? <FontAwesomeIcon className='loading-spinner-reviews' icon={faCircleNotch} spin /> 
        : reviewDisplay
      }
    </div>
  }  
}

export default AddReview;