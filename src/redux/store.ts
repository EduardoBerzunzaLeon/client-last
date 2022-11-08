/* eslint-disable import/no-cycle */
import { configureStore } from '@reduxjs/toolkit';
import { setupListeners } from '@reduxjs/toolkit/query';

import { tutorApi } from './services/tutor.api';
import authReducer from './auth/auth.slice';
import uiReducer from './ui/ui.slice';
import schoolYearReducer from './schoolYear/schoolYear.slice';

import { persistLogingMiddleware } from './auth/auth.middleware';

export const store = configureStore({
  reducer: {
    [tutorApi.reducerPath]: tutorApi.reducer,
    auth: authReducer,
    ui: uiReducer,
    schoolYear: schoolYearReducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware()
    .concat(tutorApi.middleware, persistLogingMiddleware),
});

setupListeners(store.dispatch);

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
