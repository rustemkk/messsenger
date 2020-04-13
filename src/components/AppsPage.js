import cn from 'classnames';
import { get } from 'lodash';
import React, { useEffect } from 'react';
import WebView from 'react-electron-web-view';
import { useRouteMatch, useHistory } from 'react-router-dom';
import { createUseStyles, useTheme } from 'react-jss';
import { useDispatch, useSelector } from 'react-redux';

import {
  ACTION_REQUIRED_GO_BACK,
  ACTION_REQUIRED_GO_FORWARD,
  ACTION_REQUIRED_GO_HOME,
  ACTION_REQUIRED_REFRESH,
  updateApp,
  updateAppNotificationsCount,
} from '../slices/appsSlice';
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

  const onDidFinishLoad = (e, app) => {
    const webViewRef = refs[app.id];
    // DevTools for webview app
    webViewRef && app.isWithDevTools && !webViewRef.isDevToolsOpened() && webViewRef.openDevTools();
    webViewRef && webViewRef.setZoomFactor(+app.zoomFactor || 0.9);
    // webViewRef && webViewRef.setAudioMuted(true);
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
      // const audioElement = document.getElementsByClassName('audio-element')[0];
      // audioElement.play();
      setTimeout(notification.close.bind(notification), 6000);
    }
  }

  const onNewWindow = (e, app) => {
    // console.log('onNewWindow - e', e);
    e.stopPropagation();
    e.preventDefault();
    const url = decodeURIComponent(get(e, 'url'));
    // console.log('onNewWindow - url', url);
    if (url === 'about:blank') {
      return;
    }
    // google auth in google services should be opened in same page
    const urlsToOpenInSameWindow = ['https://accounts.google.com/AccountChooser'];
    if (urlsToOpenInSameWindow.some(u => url.includes(u))) {
      const webViewRef = refs[app.id];
      // console.log('onNewWindow - webViewRef', webViewRef);
      webViewRef && webViewRef.loadURL(url);
    } else {
      window.openUrlInDefaultBrowser(url);
    }
  }

  const onPageTitleUpdated = (e, app) => {
    // console.log('onPageTitleUpdated - e.title', e.title);
    switch (app.name) {
      case 'Slack': {
        const count = parseInt(get(e.title.match(/([0-9]) new items/), '1', 0));
        dispatch(updateAppNotificationsCount({ appId: app.id, count }));
        break;
      }
      case 'Yandex Mail': {
        const count = parseInt(get(e.title.match(/^[0-9]/), '0', 0));
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

  useEffect(() => {
    apps.forEach(app => {
      if (app.actionRequired) {
        const webViewRef = refs[app.id];
        switch (app.actionRequired) {
          case ACTION_REQUIRED_GO_BACK:
            webViewRef && webViewRef.goBack();
            break;
          case ACTION_REQUIRED_GO_FORWARD:
            webViewRef && webViewRef.goForward();
            break;
          case ACTION_REQUIRED_GO_HOME:
            webViewRef && webViewRef.loadURL(app.url);
            break;
          default:
        }
        dispatch(updateApp({ appId: app.id, app: { actionRequired: null } }))
      }
    });
  }, [apps]); // eslint-disable-line

  return (
    <div className={cn(s.AppsPage, appId && s.AppsPageVisible)}>
      {apps.map(app =>
        <div className={cn(s.WebViewContainer, appId === app.id && s.WebViewContainerVisible)} key={app.id}>
          {(app.isAlwaysActive || appId === app.id) && app.actionRequired !== ACTION_REQUIRED_REFRESH &&
            <WebView
              allowpopups
              className={s.WebView}
              partition={app.partition}
              preload={`file://${window.appDirName}/${app.preload || 'preloadWebview.js'}`}
              ref={ref => refs[`${app.id}`] = ref}
              onDidFinishLoad={(e) => onDidFinishLoad(e, app)}
              onIpcMessage={(e) => onIpcMessage(e, app)}
              onNewWindow={(e) => onNewWindow(e, app)}
              onPageTitleUpdated={(e) => onPageTitleUpdated(e, app)}
              src={app.url}
              useragent={app.userAgent || 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_3) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/80.0.3987.149 Safari/537.36'}
            />
          }
        </div>
      )}
    </div>
  );
}

export default AppsPage;