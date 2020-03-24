import React from 'react';
import { Route, Switch } from 'react-router-dom';

import s from './App.module.scss';
import Menu from './Menu';
import SettingsPage from './SettingsPage';
import WindowsPage from './WindowsPage';


const App = () => {
  return (
    <div className={s.App}>
      <Menu />
      <Switch>
        <Route exact path="/" component={SettingsPage} />
        <Route exact path="/settings" component={SettingsPage} />
        <Route component={() => <div>page not found</div>} />
      </Switch>
      <WindowsPage />
    </div>
  );
}

export default App;
