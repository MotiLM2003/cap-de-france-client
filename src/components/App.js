import React from 'react';
import { connect } from 'react-redux';

const App = (props) => {
  console.log('props', props);
  return (
    <div>
      <h1>Hello</h1>
    </div>
  );
};

const stateToProps = (state) => {
  return {
    users: state.userReducer,
  };
};
export default connect(stateToProps)(App);
