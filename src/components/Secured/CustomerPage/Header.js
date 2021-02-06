import React, { useEffect } from 'react';
import img from '../../../images/logo.png';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

const Header = () => {
    return   (
        <header className='header-container'>
          <div className='header-container__brand'>
            <Link to='/backoffice/dashboard'>
              <img src={img} alt='logo' />
            </Link>
            
          </div>
          <div  className='header-container__toolbar'>
            
           
            <i
              className='fas fa-sign-out-alt header-container__icon-2'
             
            ></i>
          </div>
        </header>)
}

export default Header
