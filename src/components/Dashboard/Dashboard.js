import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import './Dashboard.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faStar, faCheckSquare, faCaretDown } from '@fortawesome/free-solid-svg-icons'
import { faStar as farstar, faSmile} from '@fortawesome/free-regular-svg-icons'

class Dashboard extends Component {
 
  render() {
    return (
      <div className='dashboard_container'>
        
        <div className='dashboard_select_container'>
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
        <div className='dashboard_boxes red_box'>
            <div className='dashboard_box_container'>
                <div className='dashboard_left_box'>
                    <FontAwesomeIcon icon={faSmile} />
                </div>
                <div className='dashboard_right_box' > 
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
        <div className='dashboard_boxes blue_box'>
            <div className='dashboard_box_container'>
                <div className='dashboard_left_box'>
                    <FontAwesomeIcon icon={faSmile} />
                </div>
                <div className='dashboard_right_box' > 
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

        <div className='dashboard_boxes golden_box'>
            <div className='dashboard_box_container'>
                <div className='dashboard_left_box'>
                    <FontAwesomeIcon icon={faSmile} />
                </div>
                <div className='dashboard_right_box' > 
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
        <div className='dashboard_boxes green_box'>
            <div className='dashboard_box_container'>
                <div className='dashboard_left_box'>
                    <FontAwesomeIcon icon={faSmile} />
                </div>
                <div className='dashboard_right_box' > 
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

export default Dashboard;