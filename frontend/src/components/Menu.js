import React from 'react';
import { useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';

import Badge from './Badge';
import s from './Menu.module.scss';
import { selectWindows } from '../slices/windowsSlice';


const Menu = () => {
  const windows = useSelector(selectWindows);

  return (
    <div className={s.Menu}>
      <div className={s.Title}>
        Messsenger
      </div>
      {windows.map(window =>
        <NavLink className={s.MenuItem} activeClassName={s.MenuItemActive} key={window.id} to={`/window/${window.id}`}>
          <img alt={window.name} src={window.iconUrl} />
          {window.notificationsCount > 0 &&
            <Badge className={s.NotificationsCount} isBlinking value={window.notificationsCount} />
          }
        </NavLink>
      )}
    </div>
  );
}

export default Menu;
