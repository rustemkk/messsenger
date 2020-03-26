import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { HashRouter } from 'react-router-dom';

import MainApp from './components/MainApp';
import './index.css';
import store from './store';
import sound from './sound.mp3';


ReactDOM.render(
  <Provider store={store}>
    <HashRouter basename="/">
      <audio className="audio-element">
        <source src={sound}></source>
      </audio>
      <MainApp />
    </HashRouter>
  </Provider>,
  document.getElementById('root')
);
