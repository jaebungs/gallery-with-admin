import React from 'react';
import ReactDOM from 'react-dom';
import Header from './components/Header';
import AppRouters from './routers/AppRouters';
import { auth } from './firebase/firebase';
import 'normalize.css/normalize.css';
import './styles/styles.scss';
import './firebase/firebase';
import 'babel-polyfill';

auth.onAuthStateChanged((user)=>{
    if (user) {
        console.log('Log in')
    } else {
        console.log('log out')
    }
})

ReactDOM.render(<AppRouters />, document.getElementById('app'));
// yarn run webpack serve --mode development