import React, { useContext } from 'react';
import { Route, Redirect } from 'react-router-dom';
import AdminHeader from '../components/adminPage/AdminHeader';
import { useAuth } from '../hooks/auth';

const PrivateRoute = ({ component: Component, ...rest }) => {
    
  const { isLoggedIn } = useAuth();

    return (
      <Route
        component={(props)=>( 
            isLoggedIn ? (
            <div>
                <AdminHeader />
                <Component {...props}/>
            </div>
                ) : (
            <Redirect to='/' />
            )
        )}
        
        {...rest}
      />
    )
  }

export default PrivateRoute;