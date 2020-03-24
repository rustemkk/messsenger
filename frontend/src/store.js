import { configureStore } from '@reduxjs/toolkit';

import windowsReducer from './slices/windowsSlice';


export default configureStore({
  reducer: {
    windows: windowsReducer,
  },
});
