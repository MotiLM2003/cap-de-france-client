import { Switch, Route, useLocation } from 'react-router-dom';
import { connect } from 'react-redux';
import Login from '../components/Login/Login';
import Register from '../components/Login/Register';
import PrivateRoute from './PrivateRoute';
import PublicRoute from './PublicRoute';

import Header from '../components/Secured/Header/Header';
import Dashboard from '../components/Secured/Dashboard/Dashboard';
import Customers from '../components/Secured/Customers/Customers';
import Manage from '../components/Secured/Manage/Manage';
import CustomersDetails from '../components/Secured/CustomersDetails/CustomersDetails';
import Planning from '../components/Secured/Planning/Planning';
import OptionsMenu from '../components/Secured/Menu/OptionsMenu';
import BackToTop from '../components/BackToTop/BackToTop';

const AppRouter = ({ isAuthenticated }) => {
  const location = useLocation();
  const authRender = () => (
    <div className='secured-container'>
      <Header />
      <div className='secured-container__main-content'>
        <OptionsMenu />
        <BackToTop />
        <div className='private-route-container'>
          <Switch location={location} key={location.key}>
            <PublicRoute exact path='/' component={Login} />
            <Route exact path='/register' component={Register} />
            <PrivateRoute exact path='/dashboard' component={Dashboard} />
            <PrivateRoute exact path='/planning' component={Planning} />
            <PrivateRoute exact path='/customers' component={Customers} />
            <PrivateRoute exact path='/manage/' component={Manage} />
            <PrivateRoute
              path='/customers/details/:id'
              component={CustomersDetails}
            />
          </Switch>
        </div>
      </div>
    </div>
  );

  const publicRender = () => (
    <Switch location={location} key={location.key}>
      <PublicRoute exact path='/' component={Login} />
      <Route exact path='/register' component={Register} />
      <PrivateRoute exact path='/dashboard' component={Dashboard} />
      <PrivateRoute exact path='/planning' component={Planning} />
    </Switch>
  );

  return isAuthenticated ? authRender() : publicRender();
};

const mapStateToProps = (state) => {
  return {
    user: state.userReducer,
    isAuthenticated: !!state.userReducer._id,
  };
};

export default connect(mapStateToProps)(AppRouter);
