import React from 'react';
import { createUseStyles, useTheme } from 'react-jss';
import { useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';

import SvgIcon from './SvgIcon';
import Toolbar from './Toolbar';
import { selectApps } from '../slices/appsSlice';


const useStyles = createUseStyles({
  Menu: {
    height: '100vh',
    display: 'flex',
    flexDirection: 'column',
    width: ({ theme }) => theme.menuWidth,
    backgroundColor: ({ theme }) => theme.backgroundColor,
  },
  Title: {
    padding: '30px 0 10px 0',
    fontSize: '10px',
    textAlign: 'center',
    cursor: 'pointer',
    WebkitAppRegion: 'drag',
    WebkitUserSelect: 'none',
  },
  MenuItems: {
    overflow: 'scroll',
  },
  MenuItem: {
    display: 'flex',
    position: 'relative',
    padding: '5px',
    marginBottom: '5px',
    alignItems: 'center',
    justifyContent: 'center',
    '&:hover': {
      backgroundColor: '#ffffff22',
      '& $Toolbar': {
        display: 'flex',
      },
    },
    '& img': {
      maxWidth: '50px',
      maxHeight: '50px',
    },
    '&.active': {
      backgroundColor: '#ffffff22',
    },
  },
  NotificationsBadge: {
    position: 'absolute',
    top: '9px',
    right: '9px',
    width: '20px',
    height: '20px',
    borderRadius: '50%',
    backgroundColor: 'palevioletred',
  },
  SettingsIcon: {
    backgroundColor: '#fff',
  },
  Toolbar: {
    display: 'none',
    position: 'absolute',
    top: 0,
    left: ({ theme }) => theme.menuWidth,
    zIndex: 20,
  }
});

const Menu = () => {

  const theme = useTheme();
  const s = useStyles({ theme });

  const apps = useSelector(selectApps);

  return (
    <div className={s.Menu}>
      <div className={s.Title}>
        Messsenger
      </div>
      <div className={s.MenuItems}>
        {apps.map(app =>
          <NavLink className={s.MenuItem} key={app.id} to={`/app/${app.id}`}>
            <img alt={app.name} src={app.iconUrl} />
            {app.notificationsCount > 0 &&
              <span className={s.NotificationsBadge} />
            }
            <Toolbar appId={app.id} className={s.Toolbar} />
          </NavLink>
        )}
        <NavLink className={s.MenuItem} to="/settings">
          <SvgIcon className={s.SettingsIcon} name="settings" size={30} />
        </NavLink>
      </div>
    </div>
  );
}

export default Menu;
