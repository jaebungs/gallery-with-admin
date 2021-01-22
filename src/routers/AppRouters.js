import React from 'react';
import {BrowserRouter, Route, Switch} from 'react-router-dom';
import NotFoundPage from '../components/NotFoundPage';
import Overview from '../components/adminPage/Overview';
import HomePage from '../components/HomePage';
import PrivateRoute from './PrivateRoute';
import {AuthProvider} from '../hooks/auth';

const AppRouters = () => {
  return (
    <AuthProvider>
      <BrowserRouter>
        <div>
          <Switch>
            <PrivateRoute path="/admin" component={Overview} exact />
            <Route path="/" component={HomePage} exact />
            <Route component={NotFoundPage} />
          </Switch>
        </div>
      </BrowserRouter>
    </AuthProvider>
  );
};

export default AppRouters;
