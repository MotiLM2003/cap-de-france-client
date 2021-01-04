import React from 'react';
import Loader from '../../Loader/Loader';

const Dashboard = () => {
  return (
    <div className='dashboard'>
      <div className='dashboard__cards'>
        <div className='card-container  dashboard__card-item'>
          <div className='card-container__header bg-warning'>Pending Cards</div>
        </div>
        <div className='card-container dashboard__card-item'>
          <div className='card-container__header bg-success'>
            Month Perfs Total: 0
          </div>
        </div>
        <div className='card-container dashboard__card-item'>
          <div className='card-container__header bg-blue'>
            Last Customers Connection
          </div>
        </div>
        <div className='card-container dashboard__card-item'>
          <div className='card-container__header bg-info'>Last Withdrawals</div>
        </div>
        <div className='card-container dashboard__card-item'>
          <div className='card-container__header bg-info'>Last Desposits</div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
