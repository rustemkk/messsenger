import { createSlice } from '@reduxjs/toolkit';
import { createSelector } from 'reselect';


const defaultApps = [
  {
    iconUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/6/60/Skype_logo_%282019%E2%80%93present%29.svg/1200px-Skype_logo_%282019%E2%80%93present%29.svg.png',
    id: 1,
    isWithDevTools: true,
    name: 'Skype',
    notificationsCount: 0,
    preload: 'preloadWebviewSkype.js',
    url: 'https://web.skype.com/',
  },
  // {
  //   iconUrl: 'https://www.smarsh.com/media/Slack.png',
  //   id: 2,
  //   // isWithDevTools: true,
  //   name: 'Slack',
  //   notificationsCount: 0,
  //   url: 'https://styliff.slack.com/',
  // },
  // {
  //   iconUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/6/6b/WhatsApp.svg/1200px-WhatsApp.svg.png',
  //   id: 3,
  //   // isWithDevTools: true,
  //   name: 'WhatsApp',
  //   notificationsCount: 0,
  //   preload: 'preloadWebviewWhatsApp.js',
  //   url: 'https://web.whatsapp.com/',
  // },
  // {
  //   iconUrl: 'https://scontent.fhel4-1.fna.fbcdn.net/v/t39.8562-6/37789948_1959933824027454_666414594595487744_n.png?_nc_cat=1&_nc_sid=6825c5&_nc_ohc=t_3mmGa0TKoAX80-X9j&_nc_ht=scontent.fhel4-1.fna&oh=4c0fe31b4f9609eb254d2927e8694f16&oe=5E9ECBB3',
  //   id: 4,
  //   // isWithDevTools: true,
  //   name: 'Messenger',
  //   notificationsCount: 0,
  //   url: 'https://www.messenger.com/',
  // },
  // {
  //   iconUrl: 'https://pngimg.com/uploads/linkedIn/linkedIn_PNG32.png',
  //   id: 5,
  //   // isWithDevTools: true,
  //   name: 'LinkedIn',
  //   notificationsCount: 0,
  //   url: 'https://www.linked.in/',
  // },
  // {
  //   iconUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/8/83/Telegram_2019_Logo.svg/1200px-Telegram_2019_Logo.svg.png',
  //   id: 6,
  //   // isWithDevTools: true,
  //   name: 'Telegram',
  //   notificationsCount: 0,
  //   url: 'https://web.telegram.org/',
  // },
  // {
  //   iconUrl: 'https://www.gstatic.com/images/branding/product/1x/gmail_512dp.png',
  //   id: 7,
  //   // isWithDevTools: true,
  //   name: 'Gmail',
  //   notificationsCount: 0,
  //   url: 'https://mail.google.com/mail/u/0/#inbox',
  // },
  // {
  //   iconUrl: 'https://www.gstatic.com/images/branding/product/1x/gmail_512dp.png',
  //   id: 8,
  //   // isWithDevTools: true,
  //   name: 'Gmail',
  //   notificationsCount: 0,
  //   partition: 'styliff',
  //   url: 'https://mail.google.com/mail/u/0/#inbox',
  // },
  // {
  //   iconUrl: 'https://lh3.googleusercontent.com/oCgYUoM7WKsJWfOKBbpWsGElgjJW4kCIYYvTBxJ0zYBc_jDxqoSalQUX4MiH-adzrag',
  //   id: 9,
  //   // isWithDevTools: true,
  //   name: 'Yandex Mail',
  //   notificationsCount: 0,
  //   url: 'https://mail.yandex.ru/',
  // },
];

const getInitialState = () => {
  try {
    const item = window.localStorage.getItem('apps');
    return item ? JSON.parse(item) : defaultApps;
  } catch (error) {
    console.log(error);
    return defaultApps;
  }
}

const persistState = (value) => {
  window.localStorage.setItem('apps', JSON.stringify(value));
}

export const slice = createSlice({
  name: 'apps',
  initialState: getInitialState(),
  reducers: {
    addApp: (state, action) => {
      // console.log('reducer addApp', action);
      const maxId = state.reduce((max, app) => Math.max(max, app.id), 0);
      state.push({
        id: maxId + 1,
        iconUrl: 'https://lh3.googleusercontent.com/8hC6BL1MFzvV1x114LtLxGtllABPhJGVFEzEpWPLk5iOlz4bZ2-uuqr0DyT4oAR1iCuh',
        name: 'New app',
      });
      persistState(state);
    },
    deleteApp: (state, action) => {
      // console.log('reducer deleteApp', action);
      const { appId } = action.payload;
      const appIndex = state.findIndex(a => a.id === appId);
      state.splice(appIndex, 1);
      persistState(state);
    },
    updateApp: (state, action) => {
      // console.log('reducer updateApp', action);
      const { appId, app } = action.payload;
      const appIndex = state.findIndex(a => a.id === appId);
      state[appIndex] = app;
      persistState(state);
    },
    updateAppNotificationsCount: (state, action) => {
      // console.log('reducer updateAppNotificationsCount', action);
      const { appId, count } = action.payload;
      const app = state.find(w => w.id === appId);
      app.notificationsCount = count;
    },
  },
});

export const { addApp, deleteApp, updateApp, updateAppNotificationsCount } = slice.actions;

export const selectApps = state => state.apps;

export const selectAppById = (appId) => createSelector(
  selectApps,
  (apps) => apps.find(app => app.id === appId)
);

export default slice.reducer;