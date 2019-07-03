import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import SearchApiService from '../../services/search-api-service'
import './Landing.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faStar,
  faCheckSquare,
  faCaretDown
} from '@fortawesome/free-solid-svg-icons';
import {
  faStar as farstar,
  faSmile
} from '@fortawesome/free-regular-svg-icons';
// import YTContext from '../../contexts/YTContext';

class Landing extends Component {

  constructor(props) {
    super(props);
    this.state = {
      channels: []
    };
  }
  //   static contextType = YTContext;
  firstInput = React.createRef();

  handleSubmit = event => {
    event.preventDefault();
    const { search } = event.target;

    //Search from context?
  };

  componentDidMount() {
    this.firstInput.current.focus();
  }

  render() {
    return (
      <div className='landing_container'>
        <div className='landing_select_container'>
          <select className='category_select'>
            <option value='' disabled selected>
              Category
            </option>
            <option value='1'>1</option>
            <option value='2'>2</option>
          </select>
          <select className='category_select'>
            <option value='' disabled selected>
              Search Terms
            </option>
            <option value='1'>1</option>
            <option value='2'>2</option>
          </select>
          <form
            className='search_form'
            onSubmit={event => this.handleSubmit(event)}
          >
            <input
              placeholder='Search'
              name='search'
              id='search-input'
              req
              ref={this.firstInput}
              className='keyword_input'
            />
            <button className='search-submit' type='submit'>
              Submit
            </button>
          </form>
        </div>
        <div className='landing_boxes red_box'>
          <div className='landing_box_container'>
            <div className='landing_left_box'>
              <FontAwesomeIcon icon={faSmile} />
            </div>
            <div className='landing_right_box'>
              Channel 1 Title
              <br />
              <FontAwesomeIcon icon={faStar} />
              <FontAwesomeIcon icon={faStar} />
              <FontAwesomeIcon icon={faStar} />
              <FontAwesomeIcon icon={faStar} />
              <FontAwesomeIcon icon={farstar} />
            </div>
          </div>
        </div>
        <div className='landing_boxes blue_box'>
          <div className='landing_box_container'>
            <div className='landing_left_box'>
              <FontAwesomeIcon icon={faSmile} />
            </div>
            <div className='landing_right_box'>
              Channel 2 Title
              <br />
              <FontAwesomeIcon icon={faStar} />
              <FontAwesomeIcon icon={faStar} />
              <FontAwesomeIcon icon={farstar} />
              <FontAwesomeIcon icon={farstar} />
              <FontAwesomeIcon icon={farstar} />
            </div>
          </div>
        </div>

        <div className='landing_boxes golden_box'>
          <div className='landing_box_container'>
            <div className='landing_left_box'>
              <FontAwesomeIcon icon={faSmile} />
            </div>
            <div className='landing_right_box'>
              Channel 3 Title
              <br />
              <FontAwesomeIcon icon={faStar} />
              <FontAwesomeIcon icon={farstar} />
              <FontAwesomeIcon icon={farstar} />
              <FontAwesomeIcon icon={farstar} />
              <FontAwesomeIcon icon={farstar} />
            </div>
          </div>
        </div>
        <div className='landing_boxes green_box'>
          <div className='landing_box_container'>
            <div className='landing_left_box'>
              <FontAwesomeIcon icon={faSmile} />
            </div>
            <div className='landing_right_box'>
              Channel 4 Title
              <br />
              <FontAwesomeIcon icon={faStar} />
              <FontAwesomeIcon icon={faStar} />
              <FontAwesomeIcon icon={faStar} />
              <FontAwesomeIcon icon={faStar} />
              <FontAwesomeIcon icon={farstar} />
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Landing;
