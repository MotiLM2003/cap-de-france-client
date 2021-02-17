import React, { useState, useEffect } from 'react';

const UserDetails = () => {
  const [menu, setMenu] = useState(0);

  const renderTab = () => {
    switch (menu) {
      case 0: {
        return () => {};
      }
      case 1: {
        return () => {};
      }
      case 2: {
        return () => {};
      }
      case 3: {
        return () => {};
      }
      case 4: {
        return () => {};
      }
    }
  };

  const renderIsSelected = (x) => {
    return parseInt(x) === menu ? 'ma-cave__tab--selected' : '';
  };
  return (
    <div className='user-details'>
      <div className='ma-cave'>
        <section className='ma-cave__tabs'>
          <div
            className={`ma-cave__tab ${renderIsSelected(0)}`}
            onClick={() => setMenu(0)}
          >
            Informations
          </div>
          <div
            className={`ma-cave__tab ${renderIsSelected(1)}`}
            onClick={() => setMenu(1)}
          >
            Historique
          </div>
          <div
            className={`ma-cave__tab ${renderIsSelected(2)}`}
            onClick={() => setMenu(2)}
          >
            Factures
          </div>
        </section>
      </div>
    </div>
  );
};

export default UserDetails;
