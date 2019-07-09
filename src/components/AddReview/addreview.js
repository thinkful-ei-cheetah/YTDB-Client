import React, { Component } from 'react';
import YTContext from '../../contexts/YTContext';

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
        console.log('leaving a review')
      };

    render() {
        return <div>
          <form
            onSubmit={event => this.handleSubmitReview(event)}
          >
            <textarea value={this.state.value} onChange={this.handleChange} />
            <button type='submit'>
            Submit
            </button>
          </form>
        </div>
    }  
}

export default AddReview;