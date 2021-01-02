import { Switch, Route, useLocation } from 'react-router-dom';

import Login from '../components/Login/Login';
import Register from '../components/Login/Register';
import PrivateRoute from './PrivateRoute';
import PublicRoute from './PublicRoute';

import Dashboard from '../components/Secured/Dashboard/Dashboard';
import Planning from '../components/Secured/Planning/Planning';
const AppRouter = () => {
  const location = useLocation();
  return (
    <Switch location={location} key={location.key}>
      <PublicRoute exact path='/' component={Login} />
      <Route exact path='/register' component={Register} />
      <PrivateRoute exact path='/dashboard' component={Dashboard} />
      <PrivateRoute exact path='/planning' component={Planning} />
    </Switch>
  );
};

export default AppRouter;
