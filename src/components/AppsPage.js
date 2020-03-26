import cn from 'classnames';
import { get } from 'lodash';
import React from 'react';
import { useRouteMatch, useHistory } from 'react-router-dom';
import { createUseStyles, useTheme } from 'react-jss';
import WebView from 'react-electron-web-view';
import { useDispatch, useSelector } from 'react-redux';

import { updateAppNotificationsCount } from '../slices/appsSlice';
import { selectApps } from '../slices/appsSlice';


const useStyles = createUseStyles({
  AppsPage: {
    position: 'absolute',
    top: 0,
    right: 0,
    bottom: 0,
    left: ({ theme }) => theme.menuWidth,
    zIndex: -1,
  },
  AppsPageVisible: {
    zIndex: 1,
  },
  WebViewContainer: {
    position: 'absolute',
    top: 0,
    right: 0,
    bottom: 0,
    left: 0,
    zIndex: -1,
    backgroundColor: ({ theme }) => theme.backgroundColor,
  },
  WebViewContainerVisible: {
    zIndex: 1,
  },
  WebView: {
    position: 'absolute',
    top: 0,
    right: 0,
    bottom: 0,
    left: 0,
  },
});

const AppsPage = () => {

  const theme = useTheme();
  const s = useStyles({ theme });

  const match = useRouteMatch({ path: '/app/:appId', strict: true, sensitive: true });
  const appId = +get(match, 'params.appId');
  const apps = useSelector(selectApps);
  const dispatch = useDispatch();
  const history = useHistory();
  const refs = {};

  const getPreload = (app) => {
    switch (app.name) {
      case 'WhatsApp':
        return `file://${window.appDirName}/preloadWebViewWhatsApp.js`;
      default:
        return `file://${window.appDirName}/preloadWebview.js`;
    }
  }

  const getUserAgent = (app) => {
    switch (app.name) {
      case 'Gmail':
        return 'Mozilla/5.0 (Windows NT 10.0) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/42.0.2311.135 Safari/537.36 Edge/12.10136';
      case 'Slack':
      case 'Skype':
      case 'WhatsApp':
      case 'Messenger':
      case 'LinkedIn':
      default:
        return 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_3) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/80.0.3987.149 Safari/537.36';
    }
  }

  const onDidFinishLoad = (e, app) => {
    const webViewRef = refs[app.id];
    // DevTools for webview app
    webViewRef && app.isWithDevTools && !webViewRef.isDevToolsOpened() && webViewRef.openDevTools();
    webViewRef && webViewRef.setZoomFactor(0.9);
  }

  const onIpcMessage = (e, app) => {
    if (get(e, 'channel') === 'webviewNotification') {
      const notification = new Notification(app.name, {
        body: get(e, 'args.0.options.body'),
        icon: app.iconUrl,
        silent: true
      });
      notification.onclick = () => {
        notification.close();
        window.ipcRendererSend('notificationClicked', null);
        history.push(`/app/${app.id}`);
      };
      const audioElement = document.getElementsByClassName('audio-element')[0];
      audioElement.play();
      setTimeout(notification.close.bind(notification), 6000);
    }
  }

  const onNewWindow = (e, app) => {
    e.stopPropagation();
    e.preventDefault();
    const url = decodeURIComponent(get(e, 'url'));
    if (url === 'about:blank') {
      return;
    }
    // google auth in google services should be opened in same page
    const urlsToOpenInSameWindow = [
      'https://accounts.google.com/AccountChooser'
    ];
    if (urlsToOpenInSameWindow.some(u => url.includes(u))) {
      const webViewRef = refs[app.id];
      webViewRef && webViewRef.loadURL(url);
    } else {
      window.openUrlInDefaultBrowser(url);
    }
  }

  const onPageTitleUpdated = (e, app) => {
    switch (app.name) {
      case 'Slack': {
        const count = e.title.match(/^(.)*(\*)+(.)*/) ? 1 : 0;
        dispatch(updateAppNotificationsCount({ appId: app.id, count }));
        break;
      }
      case 'Gmail':
      case 'Skype':
      case 'WhatsApp':
      case 'Messenger':
      case 'LinkedIn':
      default: {
        const count = parseInt(get(e.title.match(/\(([^)]+)\)/), '1', 0));
        dispatch(updateAppNotificationsCount({ appId: app.id, count }));
        break;
      }
    }
  }

  return (
    <div className={cn(s.AppsPage, appId && s.AppsPageVisible)}>
      {apps.map(app =>
        <div className={cn(s.WebViewContainer, appId === app.id && s.WebViewContainerVisible)} key={app.id}>
          <WebView
            allowpopups
            className={s.WebView}
            onDidFinishLoad={(e) => onDidFinishLoad(e, app)}
            onIpcMessage={(e) => onIpcMessage(e, app)}
            onNewWindow={(e) => onNewWindow(e, app)}
            onPageTitleUpdated={(e) => onPageTitleUpdated(e, app)}
            preload={getPreload(app)}
            ref={ref => refs[`${app.id}`] = ref}
            src={app.url}
            useragent={getUserAgent(app)}
          />
        </div>
      )}
    </div>
  );
}

export default AppsPage;