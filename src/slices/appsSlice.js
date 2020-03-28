import { createSlice } from '@reduxjs/toolkit';


const defaultApps = [
  {
    iconUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/6/60/Skype_logo_%282019%E2%80%93present%29.svg/1200px-Skype_logo_%282019%E2%80%93present%29.svg.png',
    id: 1,
    // isWithDevTools: true,
    name: 'Skype',
    notificationsCount: 0,
    preload: `file://${window.appDirName}/preloadWebview.js`,
    url: 'https://web.skype.com/',
    userAgent: 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_3) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/80.0.3987.149 Safari/537.36',
  },
  {
    iconUrl: 'https://www.smarsh.com/media/Slack.png',
    id: 2,
    // isWithDevTools: true,
    name: 'Slack',
    notificationsCount: 0,
    preload: `file://${window.appDirName}/preloadWebview.js`,
    url: 'https://styliff.slack.com/',
    userAgent: 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_3) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/80.0.3987.149 Safari/537.36',
  },
  {
    iconUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/6/6b/WhatsApp.svg/1200px-WhatsApp.svg.png',
    id: 3,
    // isWithDevTools: true,
    name: 'WhatsApp',
    notificationsCount: 0,
    preload: `file://${window.appDirName}/preloadWebViewWhatsApp.js`,
    url: 'https://web.whatsapp.com/',
    userAgent: 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_3) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/80.0.3987.149 Safari/537.36',
  },
  // {
  //   iconUrl: 'https://scontent.fhel4-1.fna.fbcdn.net/v/t39.8562-6/37789948_1959933824027454_666414594595487744_n.png?_nc_cat=1&_nc_sid=6825c5&_nc_ohc=t_3mmGa0TKoAX80-X9j&_nc_ht=scontent.fhel4-1.fna&oh=4c0fe31b4f9609eb254d2927e8694f16&oe=5E9ECBB3',
  //   id: 4,
  //   // isWithDevTools: true,
  //   name: 'Messenger',
  //   notificationsCount: 0,
  //   preload: `file://${window.appDirName}/preloadWebview.js`,
  //   url: 'https://www.messenger.com/',
  //   userAgent: 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_3) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/80.0.3987.149 Safari/537.36',
  // },
  // {
  //   iconUrl: 'https://pngimg.com/uploads/linkedIn/linkedIn_PNG32.png',
  //   id: 5,
  //   // isWithDevTools: true,
  //   name: 'LinkedIn',
  //   notificationsCount: 0,
  //   preload: `file://${window.appDirName}/preloadWebview.js`,
  //   url: 'https://www.linked.in/',
  //   userAgent: 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_3) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/80.0.3987.149 Safari/537.36',
  // },
  // {
  //   iconUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/8/83/Telegram_2019_Logo.svg/1200px-Telegram_2019_Logo.svg.png',
  //   id: 6,
  //   // isWithDevTools: true,
  //   name: 'Telegram',
  //   notificationsCount: 0,
  //   preload: `file://${window.appDirName}/preloadWebview.js`,
  //   url: 'https://web.telegram.org/',
  //   userAgent: 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_3) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/80.0.3987.149 Safari/537.36',
  // },
  {
    iconUrl: 'https://www.gstatic.com/images/branding/product/1x/gmail_512dp.png',
    id: 7,
    // isWithDevTools: true,
    name: 'Gmail',
    notificationsCount: 0,
    preload: `file://${window.appDirName}/preloadWebview.js`,
    url: 'https://mail.google.com/mail/u/0/#inbox',
    // userAgent: 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_3) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/80.0.3987.149 Safari/537.36 Edge/12.10136',
    userAgent: 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_3) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/80.0.3987.149 Safari/537.36',
  },
  {
    iconUrl: 'https://www.gstatic.com/images/branding/product/1x/gmail_512dp.png',
    id: 8,
    // isWithDevTools: true,
    name: 'Gmail',
    notificationsCount: 0,
    partition: 'styliff',
    preload: `file://${window.appDirName}/preloadWebview.js`,
    url: 'https://mail.google.com/mail/u/0/#inbox',
    // userAgent: 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_3) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/80.0.3987.149 Safari/537.36 Edge/12.10136',
    userAgent: 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_3) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/80.0.3987.149 Safari/537.36',
  },
  {
    iconUrl: 'https://lh3.googleusercontent.com/oCgYUoM7WKsJWfOKBbpWsGElgjJW4kCIYYvTBxJ0zYBc_jDxqoSalQUX4MiH-adzrag',
    id: 9,
    // isWithDevTools: true,
    name: 'Yandex Mail',
    notificationsCount: 0,
    preload: `file://${window.appDirName}/preloadWebview.js`,
    url: 'https://mail.yandex.ru/',
    userAgent: 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_3) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/80.0.3987.149 Safari/537.36',
  },
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
      console.log('reducer addApp', action);
      state.push(action.payload);
      persistState(state);
    },
    updateAppNotificationsCount: (state, action) => {
      const { appId, count } = action.payload;
      const app = state.find(w => w.id === appId);
      app.notificationsCount = count;
    },
  },
});

export const { addApp, updateAppNotificationsCount } = slice.actions;

export const selectApps = state => state.apps;

export default slice.reducer;
