import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import history from '../../../history';

const OptionsMenu = () => {
  const [menuItem, setMenuItem] = useState(0);
  const [subMenuItem, setSubMenuItem] = useState(0);
  const [isSubMenuOn, setIsSubMenuOn] = useState(false);

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

  const subLoadPage = (menuItem) => {
    setSubMenuItem(menuItem);
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
        <i className='fas fa-tachometer-alt'></i>
        <span>Dashboard</span>
      </div>
      <div
        className={`secured-container__menu-item ${
          menuItem === 1 ? 'secured-container__selected' : ''
        }`}
        onClick={() => loadPage(1)}
      >
        <i className='fas fa-users'></i>
        <span>Customers</span>
      </div>

      <div
        className={`secured-container__menu-item ${
          menuItem === 2 ? 'secured-container__selected' : ''
        }`}
        onClick={() => loadPage(2)}
      >
        <i className='far fa-calendar-alt'></i>
        <span>Planning</span>
      </div>
    </div>
  );
};

export default OptionsMenu;
