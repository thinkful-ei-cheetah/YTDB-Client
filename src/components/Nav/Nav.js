import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBookmark, faSignOutAlt, faSignInAlt, faUserPlus } from '@fortawesome/free-solid-svg-icons'
import TokenService from '../../services/token-service';
import UserContext from '../../contexts/UserContext';
import './Nav.css';

class Nav extends Component {
  static contextType = UserContext

  handleLogoutClick = () => {
    this.context.processLogout()
  }

  renderLogoutLink() {
    return (
      <nav role='navigation' className='header-menu-link nav-wrapper'>
        <span className='nav-username' style={{display:'inline-block', textOverflow: 'ellipsis', overflow: 'hidden', whiteSpace: 'nowrap'}}>{this.context.user.name}
        </span>
        <Link to='/dashboard'>
          <FontAwesomeIcon icon={faBookmark} />
        </Link>
        <div className='header-menu-link'>
          <Link
            onClick={this.handleLogoutClick}
            to='/login'>
           logout
          </Link>
        </div>
      </nav>
    )
  }

  renderLoginLink() {
    return (
      <nav role='navigation' className='header-menu-link nav-wrapper'>
        <Link className='login-link' to='/login'>
          Login
        </Link>
        <Link className='register-link' to='/register'>
         Register
        </Link>
      </nav>
    )
  }

  render() {
    return (
      <header role='banner' className='header-grid'>
        <h1>
          <Link to='/'>
            YTDB
          </Link>

          <Link to='/about'><div className="about_span">?</div></Link>
        </h1>
        
        <div className='header-menu'>
          {TokenService.hasAuthToken()
            ? this.renderLogoutLink()
            : this.renderLoginLink()}
        </div>
      </header>
    );
  }
}

export default Nav;