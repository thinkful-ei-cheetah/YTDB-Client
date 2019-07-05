import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import './Landing.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faStar, faCheckSquare, faCaretDown } from '@fortawesome/free-solid-svg-icons'
import { faStar as farstar, faSmile} from '@fortawesome/free-regular-svg-icons'
import axios from 'axios';
const KEY = 'AIzaSyA18qBIdJxvFaX35Tr8YWC5exJ4NQb6eH4';



class Landing extends Component {
 
    constructor(props) {
        super(props);
        this.handleSubmit = this.handleSubmit.bind(this);
      }

    handleSubmit = async () => {
       
        axios.get('https://www.googleapis.com/youtube/v3/search', {
            params: {
                q: 'The Onion',
                part: 'snippet',
                maxResults: 5,
                key: KEY,
                type: 'channel'
            }
          }).then(res => {
            console.log(res)
          })

    }
   
  render() {


    return (



      <div className='landing_container'>
      <button onClick={this.handleSubmit}>
      Activate Lasers
    </button>
        
        <div className='landing_select_container'>
            <select className='category_select'>
                <option value="" disabled selected>Category</option>
                <option value="1">1</option>
                <option value="2">2</option>
            

            </select>
            <select className='category_select'>
                <option value="" disabled selected>Search Terms</option>
                <option value="1">1</option>
                <option value="2">2</option>

            

            </select>
            <input className='keyword_input' />
        </div>
        <div className='landing_boxes red_box'>
            <div className='landing_box_container'>
                <div className='landing_left_box'>
                    <FontAwesomeIcon icon={faSmile} />
                </div>
                <div className='landing_right_box' > 
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
                <div className='landing_right_box' > 
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
                <div className='landing_right_box' > 
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
                <div className='landing_right_box' > 
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