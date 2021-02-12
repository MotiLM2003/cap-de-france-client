import React, { useEffect, useState } from 'react';
import WaitingInventoryRequets from './WaitingInventoryRequets';
import ApprovedInventoryRequests from './ApprovedInventoryRequests';

const MaCave = ({ headers }) => {
  const [menu, setMenu] = useState(0);
  const renderIsSelected = (x) => {
    return parseInt(x) === menu ? 'ma-cave__tab--selected' : '';
  };

  const renderTab = () => {
    switch (menu) {
      case 0: {
        return <ApprovedInventoryRequests headers={headers} />;
      }
      case 1: {
        return <WaitingInventoryRequets headers={headers} />;
      }
    }
  };

  return (
    <div>
      <section className='cards-container__toolbar'>&nbsp;</section>
      <div className='ma-cave'>
        <section className='ma-cave__tabs'>
          <div
            className={`ma-cave__tab ${renderIsSelected(0)}`}
            onClick={() => setMenu(0)}
          >
            Ma Cave
          </div>
          <div
            className={`ma-cave__tab ${renderIsSelected(1)}`}
            onClick={() => setMenu(1)}
          >
            En attente
          </div>
          <div
            className={`ma-cave__tab ${renderIsSelected(2)}`}
            onClick={() => setMenu(2)}
          >
            Offers
          </div>
          <div
            className={`ma-cave__tab ${renderIsSelected(3)}`}
            onClick={() => setMenu(3)}
          >
            Ventes
          </div>
          <div
            className={`ma-cave__tab ${renderIsSelected(4)}`}
            onClick={() => setMenu(4)}
          >
            Retraits
          </div>
        </section>
        <section className='ma-cave__content'>{renderTab()}</section>
      </div>
    </div>
  );
};

export default MaCave;
