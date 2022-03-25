import {
  Middleware,
  isFulfilled,
  MiddlewareAPI,
} from '@reduxjs/toolkit';
// eslint-disable-next-line import/no-cycle
import { setDefaultAuthState } from './auth.slice';

export const persistLogingMiddleware: Middleware = (api: MiddlewareAPI) => (next) => (action) => {
  const result = next(action);
  const { token } = api.getState().auth;
  if (isFulfilled(action)) {
    const { endpointName } = action.meta.arg;
    if (
      endpointName === 'login'
      || endpointName === 'signInWithSocial'
      || endpointName === 'renewToken'
      || endpointName === 'resetPassword'
      || endpointName === 'updatePassword'
    ) {
      localStorage.setItem('token', token);
      localStorage.setItem('token-init-date', `${new Date().getTime()}`);
    }
  }

  if (setDefaultAuthState.match(action)) {
    localStorage.clear();
  }
  return result;
};

export default { persistLogingMiddleware };
