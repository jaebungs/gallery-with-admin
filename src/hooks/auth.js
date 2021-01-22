import React, {useState, useEffect, useContext} from 'react';
import {auth} from '../firebase/firebase';

export const AuthContext = React.createContext();

export const startLogout = () => {
  auth
    .signOut()
    .then(() => {
      console.log('logged out');
    })
    .catch((error) => {
      console.log('log out error', error);
    });
};

export const useAuth = () => {
  return useContext(AuthContext);
};

export const AuthProvider = ({children}) => {
  const [isLoggedIn, setIsLoggedIn] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsub = auth.onAuthStateChanged((user) => {
      if (user) {
        setIsLoggedIn(user);
        setLoading(false);
        console.log('logged in auth');
      } else {
        console.log('logged out');
        setIsLoggedIn(null);
      }
    });
    return () => {
      unsub();
    };
  }, []);

  const startLogin = (email, password) => {
    return auth.signInWithEmailAndPassword(email, password);
  };

  const startLogout = () => {
    return auth.signOut();
  };

  const value = {isLoggedIn, startLogin, startLogout};

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
