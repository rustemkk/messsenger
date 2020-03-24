import cn from 'classnames';
import { get } from 'lodash';
import React from 'react';
import WebView from 'react-electron-web-view';
import { useDispatch, useSelector } from 'react-redux';

import { updateWindowNotificationsCount } from '../slices/windowsSlice';
import { selectWindows } from '../slices/windowsSlice';
import s from './WindowsPage.module.scss';
import { useRouteMatch } from 'react-router-dom';


const userAgent = 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/70.0.3538.77 Safari/537.36';

const WindowsPage = () => {
  const match = useRouteMatch({ path: '/window/:windowId', strict: true, sensitive: true });
  const windowId = +get(match, 'params.windowId');
  const windows = useSelector(selectWindows);
  const dispatch = useDispatch();

  const onPageTitleUpdated = (e, window) => {
    switch (window.name) {
      case 'Gmail':
      case 'Skype':
      case 'WhatsApp':
      case 'Messenger':
      case 'LinkedIn':
        const count = parseInt(get(e.title.match(/\(([^)]+)\)/), '1', 0));
        dispatch(updateWindowNotificationsCount({ windowId: window.id, count }));
        break;
      // case 'Slack': {
      //   console.log(e.title);
      //   const count = e.title.match(/^[*!]/) ? 1 : 0;
      //   dispatch(updateWindowNotificationsCount({ windowId: window.id, count }));
      //   break;
      // }
    }
  }

  return (
    <div className={cn(s.WindowsPage, windowId && s.WindowsPageVisible)}>
      {windows.map(window =>
        <div className={cn(s.WebViewContainer, windowId === window.id && s.WebViewContainerVisible)} key={window.id}>
          <WebView
            allowpopups
            className={s.WebView}
            onPageTitleUpdated={(e) => onPageTitleUpdated(e, window)}
            src={window.url}
            useragent={userAgent}
          />
        </div>
      )}
    </div>
  );
}

export default WindowsPage;
