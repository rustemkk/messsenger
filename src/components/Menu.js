import React from 'react';
import { createUseStyles, useTheme } from 'react-jss';
import { useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';

import SvgIcon from './SvgIcon';
import { selectApps } from '../slices/appsSlice';


const useStyles = createUseStyles({
  Menu: {
    display: 'flex',
    flexDirection: 'column',
    width: ({ theme }) => theme.menuWidth,
    height: '100%',
    backgroundColor: ({ theme }) => theme.backgroundColor,
  },
  Title: {
    padding: '40px 0 10px 0',
    fontSize: '12px',
    textAlign: 'center',
    cursor: 'pointer',
    WebkitAppRegion: 'drag',
    WebkitUserSelect: 'none',
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
      {apps.map(app =>
        <NavLink className={s.MenuItem} key={app.id} to={`/app/${app.id}`}>
          <img alt={app.name} src={app.iconUrl} />
          {app.notificationsCount > 0 &&
            <span className={s.NotificationsBadge} />
          }
        </NavLink>
      )}
      <NavLink className={s.MenuItem} to="/settings">
        <SvgIcon className={s.SettingsIcon} name="settings" size={30} />
      </NavLink>
    </div>
  );
}

export default Menu;
