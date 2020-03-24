import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { HashRouter } from 'react-router-dom';

import App from './components/App';
import './index.module.scss';
import store from './store';


ReactDOM.render(
  <Provider store={store}>
    <HashRouter basename="/">
      <App />
    </HashRouter>
  </Provider>,
  document.getElementById('root')
);
