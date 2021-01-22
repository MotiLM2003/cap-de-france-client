import React, { useState } from 'react';
import ManageInventory from './ManageInventory';

const ManageInventoryMenu = () => {
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
        return <ManageInventory />;
      }
      case 2: {
        return () => {};
      }

      default: {
        return () => {};
      }
    }
  };

  return (
    <div className='manage-customers'>
      <div className='manage-customers__buttons'>
        <button
          class={`button  bg-blue-deep-inverse ${isSelectedClass(1)}`}
          onClick={() => changeMenu(1)}
        >
          Manage Inventory
        </button>

        <button
          class={`button bg-blue-deep-inverse ${isSelectedClass(2)}`}
          onClick={() => changeMenu(2)}
        >
          Import Customers
        </button>
      </div>
      <div class='manage-content'>{getComponent()}</div>
    </div>
  );
};

export default ManageInventoryMenu;
