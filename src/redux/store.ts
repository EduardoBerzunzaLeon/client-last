import { configureStore } from '@reduxjs/toolkit';
import { setupListeners } from '@reduxjs/toolkit/query';

// eslint-disable-next-line import/no-cycle
import { tutorApi } from './services/tutorApi';
// eslint-disable-next-line import/no-cycle
import authReducer from './auth/auth.slice';
import uiReducer from './ui/ui.slice';
import { persistLogingMiddleware } from './auth/auth.middleware';

export const store = configureStore({
  reducer: {
    [tutorApi.reducerPath]: tutorApi.reducer,
    auth: authReducer,
    ui: uiReducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware()
    .concat(tutorApi.middleware, persistLogingMiddleware),
});

// optional, but required for refetchOnFocus/refetchOnReconnect behaviors
// see `setupListeners` docs - takes an optional callback as the 2nd arg for customization
setupListeners(store.dispatch);

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
