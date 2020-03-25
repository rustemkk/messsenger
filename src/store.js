import { configureStore } from '@reduxjs/toolkit';

import appsReducer from './slices/appsSlice';


export default configureStore({
  reducer: {
    apps: appsReducer,
  },
});
