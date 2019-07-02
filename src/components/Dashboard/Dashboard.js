import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import './Dashboard.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faStar, faCheckSquare } from '@fortawesome/free-solid-svg-icons'
import { faStar as farstar} from '@fortawesome/free-regular-svg-icons'

class Dashboard extends Component {
 
  render() {
    return (
      <div className='dashboard_container'>




        <div className='dashboard_boxes red_box'>
            dasdf  
            <FontAwesomeIcon icon={faStar} />
            <FontAwesomeIcon icon={faStar} />
            <FontAwesomeIcon icon={faStar} />
            <FontAwesomeIcon icon={faStar} />
            <FontAwesomeIcon icon={farstar} />

            
        </div>
        <div className='dashboard_boxes blue_box'>
            dasdf
        </div>

        <div className='dashboard_boxes golden_box'>
            dasdf
        </div>
        <div className='dashboard_boxes green_box'>
            dasdf
        </div>
      </div>
    );
  }
}

export default Dashboard;