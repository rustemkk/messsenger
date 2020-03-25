import React from 'react';
import { useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';

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
            <span className={s.NotificationsCount} />
          }
        </NavLink>
      )}
    </div>
  );
}

export default Menu;
