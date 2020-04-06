import React from 'react';
import { createUseStyles, useTheme } from 'react-jss';
import { useDispatch, useSelector } from 'react-redux';

import { addApp, selectApps } from '../slices/appsSlice';
import AppSettings from './AppSettings';
import Button from './Button';


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
    margin: '10px 0 0 150px',
    fontSize: '24px',
  },
  AddAppButton: {
    width: '100%',
  },
});

const SettingsPage = () => {

  const theme = useTheme();
  const s = useStyles({ theme });

  const dispatch = useDispatch();

  const apps = useSelector(selectApps);

  return (
    <div className={s.SettingsPage}>
      {/* <div className={s.SettingsHeader}>Settings</div> */}
      <div className={s.SettingsHeader}>Apps</div>
      {apps.map(app =>
        <AppSettings appId={app.id} key={app.id} />
      )}
      <Button className={s.AddAppButton} label="Add app" onClick={() => dispatch(addApp())} />
    </div>
  );
}

export default SettingsPage;
