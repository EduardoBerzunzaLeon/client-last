import { createSlice, isAnyOf } from '@reduxjs/toolkit';

import { User } from '../../interfaces/api';
// import { userLogged } from '../../tests/fixtures/testData/fakeAuthData';
// eslint-disable-next-line import/no-cycle
import { authApi } from './auth.api';

export interface AuthState {
  user: User | null,
  token: string | null,
}

const authSlice = createSlice({
  name: 'auth',
  initialState: { user: null, token: null } as AuthState,
  reducers: {
    setDefaultAuthState: (state) => {
      state.user = null;
      state.token = null;
      // state.user = userLogged.data;
      // state.token = userLogged.token;
    },
  },
  extraReducers: (builder) => {
    builder
      .addMatcher(
        isAnyOf(
          authApi.endpoints.login.matchFulfilled,
          authApi.endpoints.signInWithSocial.matchFulfilled,
          authApi.endpoints.renewToken.matchFulfilled,
          authApi.endpoints.resetPassword.matchFulfilled,
        ),
        (state, { payload }) => {
          state.token = payload.token;
          state.user = payload.data;
        },
      );
  },
});

export const { setDefaultAuthState } = authSlice.actions;

export default authSlice.reducer;
