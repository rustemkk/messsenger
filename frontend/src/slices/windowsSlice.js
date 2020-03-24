import { createSlice } from '@reduxjs/toolkit';


export const slice = createSlice({
  name: 'windows',
  initialState: [
    {
      id: 1,
      name: 'Skype',
      iconUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/6/60/Skype_logo_%282019%E2%80%93present%29.svg/1200px-Skype_logo_%282019%E2%80%93present%29.svg.png',
      url: 'https://web.skype.com/',
    },
    {
      id: 2,
      name: 'Slack',
      iconUrl: 'https://www.smarsh.com/media/Slack.png',
      url: 'https://styliff.slack.com/',
    },
    {
      id: 3,
      name: 'WhatsApp',
      iconUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/6/6b/WhatsApp.svg/1200px-WhatsApp.svg.png',
      url: 'https://web.whatsapp.com/',
    },
  ],
  reducers: {
    addWindow: (state, action) => {
      console.log('reducer addWindow', action);
      state.push(action.payload);
    },
  },
});

export const { addWindow } = slice.actions;

export const selectWindows = state => state.windows;

export default slice.reducer;
