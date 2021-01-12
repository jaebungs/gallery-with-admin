import React from 'react';
import ReactDOM from 'react-dom';
import Header from './components/Header';
import AppRouters from './routers/AppRouters';
import 'normalize.css/normalize.css';
import './styles/styles.scss';
import './firebase/firebase';
import 'babel-polyfill';

ReactDOM.render(<AppRouters />, document.getElementById('app'));
// yarn run webpack serve --mode development