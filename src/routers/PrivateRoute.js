import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { Route, Redirect } from 'react-router-dom';
import { loadData } from '../actions/userActions';
import Cookies from 'universal-cookie';
import Header from '../components/Secured/Header/Header';
import OptionsMenu from '../components/Secured/Menu/OptionsMenu';

const cookie = new Cookies();

const token = cookie.get('token');
export const PrivateRoute = ({
  isAuthenticated,
  user,
  component: Component,
  loadData,
  ...rest
}) => {
  useEffect(() => {
    if (!isAuthenticated) {
      console.log('start');
      loadData(token);
      console.log(user);
    }
  }, []);
  return (
    <div class='secured-container'>
      <Header />
      <div className='secured-container__main-content'>
        <OptionsMenu />
        <div class='private-route-container'>
          <Route
            {...rest}
            component={(props) =>
              isAuthenticated ? <Component {...props} /> : <Redirect to='/' />
            }
          />
        </div>
      </div>
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    user: state.userReducer,
    isAuthenticated: !!state.userReducer._id,
  };
};
export default connect(mapStateToProps, { loadData })(PrivateRoute);
