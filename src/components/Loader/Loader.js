import React from 'react';
import ReactDOM from 'react-dom';

const Loader = () => {
  return ReactDOM.createPortal(
    <div className='loader'>
      <div className='loader__content'>
        <div class='loader-spinner'></div>Loading Data
      </div>
    </div>,
    document.getElementById('loader')
  );
};

export default Loader;
