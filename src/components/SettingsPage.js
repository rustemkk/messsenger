import React from 'react';
import { createUseStyles, useTheme } from 'react-jss';
import { useSelector } from 'react-redux';

import { selectApps } from '../slices/appsSlice';
import AppSettings from './AppSettings';


const useStyles = createUseStyles({
  SettingsPage: {
    padding: '10px',
    position: 'absolute',
    top: 0,
    right: 0,
    bottom: 0,
    left: ({ theme }) => theme.menuWidth,
    backgroundColor: ({ theme }) => theme.backgroundColor,
    borderLeft: ({ theme }) => theme.border,
  },
  SettingsHeader: {
    fontSize: '24px',
  },
});

const SettingsPage = () => {

  const theme = useTheme();
  const s = useStyles({ theme });

  const apps = useSelector(selectApps);

  return (
    <div className={s.SettingsPage}>
      {/* <div className={s.SettingsHeader}>Settings</div> */}
      {/* <div className={s.SettingsHeader}>Apps</div> */}
      {apps.map(app =>
        <AppSettings id={app.id} key={app.id} />
      )}
    </div>
  );
}

export default SettingsPage;
