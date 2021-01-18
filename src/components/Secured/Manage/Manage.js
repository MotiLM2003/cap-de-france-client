import React, { useState, useEffect } from 'react';

import Users from './Users/Users';
import Inventory from './Inventory/Inventory';
import ManageCustomers from './ManageCustomers/ManageCustomers';
const Manage = () => {
  const [menu, setMenu] = useState(1);

  const isSelectedClass = (x) => {
    return menu === x ? 'selected' : '';
  };

  const changeMenu = (x) => {
    setMenu(x);
  };

  const getComponent = () => {
    switch (menu) {
      case 1: {
        return <Users />;
      }
      case 2: {
        return <ManageCustomers />;
      }
      case 3: {
        return <Inventory />;
      }
      default: {
        return <Users />;
      }
    }
  };
  return (
    <div className='manage'>
      <div className='manage__buttons'>
        <button
          class={`button ${isSelectedClass(1)}`}
          onClick={() => changeMenu(1)}
        >
          Manage Users
        </button>
        <button
          class={`button ${isSelectedClass(2)}`}
          onClick={() => changeMenu(2)}
        >
          Manage Customers
        </button>
        <button
          class={`button ${isSelectedClass(3)}`}
          onClick={() => changeMenu(3)}
        >
          Inventory
        </button>
        <button
          class={`button ${isSelectedClass(4)}`}
          onClick={() => changeMenu(4)}
        >
          Some thing else
        </button>
      </div>
      <div class='manage-content'>{getComponent()}</div>
    </div>
  );
};

export default Manage;