import React from 'react';
import { ThemeProvider, createUseStyles } from 'react-jss';
import { Route, Switch } from 'react-router-dom';

import Menu from './Menu';
import SettingsPage from './SettingsPage';
import AppsPage from './AppsPage';


const theme = {
  backgroundColor: '#282c34',
  border: '1px solid #ffffff16',
  menuWidth: '74px',
};

const useStyles = createUseStyles({
  MainApp: {
    width: '100%',
    height: '100%',
    display: 'flex',
    flexDirection: 'row',
  },
});

const App = () => {

  const s = useStyles();

  return (
    <ThemeProvider theme={theme}>
      <div className={s.MainApp}>
        <Menu />
        <Switch>
          <Route exact path="/" component={SettingsPage} />
          <Route exact path="/settings" component={SettingsPage} />
          <Route component={() => <div>page not found</div>} />
        </Switch>
        <AppsPage />
      </div>
    </ThemeProvider>
  );
}

export default App;
