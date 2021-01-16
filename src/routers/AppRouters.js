import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Header from '../components/Header';
import NotFoundPage from '../components/NotFoundPage';
import Overview from '../components/adminPage/Overview';
import HomePage from '../components/HomePage';

const AppRouters = () => {
    function PrivateRoute({ component: Component, authenticated, ...rest }) {
        return (
          <Route
            {...rest}
            render={(props) => authenticated === true
              ? <Component {...props} />
              : <Redirect to={{ pathname: '/login', state: { from: props.location } }} />}
          />
        )
      }

    return (
        <BrowserRouter>
            <div>
                <Header />
                <Switch>
                    <Route path="/" component={HomePage} exact />
                    <Route path="/admin" component={Overview} exact />
                    <Route component={NotFoundPage} />
                </Switch>
            </div>
        </BrowserRouter>
    )
}

export default AppRouters;