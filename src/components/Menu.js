import React from 'react';
import { useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';

import s from './Menu.module.scss';
import { selectApps } from '../slices/appsSlice';


const Menu = () => {
  const apps = useSelector(selectApps);

  return (
    <div className={s.Menu}>
      <div className={s.Title}>
        Messsenger
      </div>
      {apps.map(app =>
        <NavLink className={s.MenuItem} activeClassName={s.MenuItemActive} key={app.id} to={`/app/${app.id}`}>
          <img alt={app.name} src={app.iconUrl} />
          {app.notificationsCount > 0 &&
            <span className={s.NotificationsCount} />
          }
        </NavLink>
      )}
    </div>
  );
}

export default Menu;