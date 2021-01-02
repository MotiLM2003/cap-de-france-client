import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import history from '../../../history';

const OptionsMenu = () => {
  const [menuItem, setMenuItem] = useState(0);

  const loadPage = (menuItem) => {
    setMenuItem(menuItem);
    switch (menuItem) {
      case 0: {
        // history.push('/dashboard');
        break;
      }
      case 2: {
        // history.push('/planning');
        break;
      }
    }
  };
  return (
    <div className='secured-container__menu'>
      <div
        className={`secured-container__menu-item ${
          menuItem == 0 ? 'secured-container__selected' : ''
        }`}
        onClick={() => loadPage(0)}
      >
        <i class='fas fa-tachometer-alt'></i>
        <span>Dashboard</span>
      </div>
      <div
        className={`secured-container__menu-item ${
          menuItem === 1 ? 'secured-container__selected' : ''
        }`}
        onClick={() => loadPage(1)}
      >
        <i class='fas fa-users'></i>
        <span>Customers</span>
        <i class='fas fa-arrow-circle-down '></i>
      </div>
      <div
        className={`secured-container__submenu ${
          menuItem === 1 ? '' : 'hide'
        }  ${menuItem === 0 ? '' : 'opacityOn'}`}
      >
        <ul>
          <li className='secured-container__submenu-item'>All</li>
          <li className='secured-container__submenu-item'>New</li>
          <li className='secured-container__submenu-item'>Deposits</li>
          <li className='secured-container__submenu-item'>Interested</li>
        </ul>
      </div>
      <div
        className={`secured-container__menu-item ${
          menuItem === 2 ? 'secured-container__selected' : ''
        }`}
        onClick={() => loadPage(2)}
      >
        <i class='far fa-calendar-alt'></i>
        <span>Planning</span>
      </div>
    </div>
  );
};

export default OptionsMenu;
