import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import history from '../../../history';

import close from '../../../images/close.svg';

const OptionsMenu = () => {
  const [menuItem, setMenuItem] = useState(0);
  const [subMenuItem, setSubMenuItem] = useState(0);
  const [isSubMenuOn, setIsSubMenuOn] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  useEffect(() => {}, []);
  const loadPage = (menuItem) => {
    setMenuItem(menuItem);
    switch (menuItem) {
      case 0: {
        history.push('/dashboard');
        break;
      }
      case 1: {
        history.push('/customers');
        break;
      }

      case 2: {
        history.push('/planning');
        break;
      }
    }
  };

  return (
    <div
      className={`secured-container__menu ${
        isMenuOpen ? '' : 'secured-container--close'
      }`}
    >
      <div
        class={`secured-container__close`}
        onClick={() => setIsMenuOpen(!isMenuOpen)}
      >
        <label
          labelFor='chbMenu'
          className={`secured-container__humburger ${
            !isMenuOpen ? '' : 'secured-container__menu--closed'
          }`}
        ></label>
      </div>
      <div
        className={`secured-container__menu-item ${
          menuItem == 0 ? 'secured-container__selected' : ''
        }`}
        onClick={() => loadPage(0)}
      >
        <div className='secured-container__menu-icon-container'>
          <i className='fas fa-tachometer-alt'></i>
        </div>
        <span>Dashboard</span>
      </div>
      <div
        className={`secured-container__menu-item ${
          menuItem === 1 ? 'secured-container__selected' : ''
        }`}
        onClick={() => loadPage(1)}
      >
        <div className='secured-container__menu-icon-container'>
          <i className='fas fa-users'></i>
        </div>
        <span>Customers</span>
      </div>

      <div
        className={`secured-container__menu-item ${
          menuItem === 2 ? 'secured-container__selected' : ''
        }`}
        onClick={() => loadPage(2)}
      >
        <div className='secured-container__menu-icon-container'>
          <i className='far fa-calendar-alt'></i>
        </div>
        <span>Planning</span>
      </div>
    </div>
  );
};

export default OptionsMenu;
