import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { HashRouter } from 'react-router-dom';

import MainApp from './components/MainApp';
import './index.module.scss';
import store from './store';


ReactDOM.render(
  <Provider store={store}>
    <HashRouter basename="/">
      <MainApp />
    </HashRouter>
  </Provider>,
  document.getElementById('root')
);
