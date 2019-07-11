import React, { Component } from 'react';
import YTContext from '../../contexts/YTContext';
import ReviewsService from '../../services/reviews-service';

class AddReview extends Component {
  
    constructor(props) {
        super(props);
        this.handleSubmitReview = this.handleSubmitReview.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.state = {
            value: 'Please leave a review.'
          };
      }

      static contextType = YTContext;

      handleChange(event) {
        this.setState({value: event.target.value});
      }

      handleSubmitReview = event => {
        event.preventDefault();
        const { search } = event.target;
        ReviewsService.addReview(this.state.value);
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