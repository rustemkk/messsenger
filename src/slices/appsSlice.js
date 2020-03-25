import { createSlice } from '@reduxjs/toolkit';


const defaultApps = [
  {
    id: 1,
    name: 'Skype',
    iconUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/6/60/Skype_logo_%282019%E2%80%93present%29.svg/1200px-Skype_logo_%282019%E2%80%93present%29.svg.png',
    url: 'https://web.skype.com/',
    notificationsCount: 0,
  },
  {
    id: 2,
    name: 'Slack',
    iconUrl: 'https://www.smarsh.com/media/Slack.png',
    url: 'https://styliff.slack.com/',
    notificationsCount: 0,
  },
  {
    id: 3,
    name: 'WhatsApp',
    iconUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/6/6b/WhatsApp.svg/1200px-WhatsApp.svg.png',
    url: 'https://web.whatsapp.com/',
    notificationsCount: 0,
  },
  // {
  //   id: 4,
  //   name: 'Messenger',
  //   iconUrl: 'https://scontent.fhel4-1.fna.fbcdn.net/v/t39.8562-6/37789948_1959933824027454_666414594595487744_n.png?_nc_cat=1&_nc_sid=6825c5&_nc_ohc=t_3mmGa0TKoAX80-X9j&_nc_ht=scontent.fhel4-1.fna&oh=4c0fe31b4f9609eb254d2927e8694f16&oe=5E9ECBB3',
  //   url: 'https://www.messenger.com/',
  //   notificationsCount: 0,
  // },
  // {
  //   id: 5,
  //   name: 'LinkedIn',
  //   iconUrl: 'https://pngimg.com/uploads/linkedIn/linkedIn_PNG32.png',
  //   url: 'https://www.linked.in/',
  //   notificationsCount: 0,
  // },
  // {
  //   id: 6,
  //   name: 'Telegram',
  //   iconUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/8/83/Telegram_2019_Logo.svg/1200px-Telegram_2019_Logo.svg.png',
  //   url: 'https://web.telegram.org/',
  //   notificationsCount: 0,
  // },
  {
    id: 7,
    name: 'Gmail',
    iconUrl: 'https://www.gstatic.com/images/branding/product/1x/gmail_512dp.png',
    url: 'https://mail.google.com/mail/u/0/#inbox',
    notificationsCount: 0,
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
