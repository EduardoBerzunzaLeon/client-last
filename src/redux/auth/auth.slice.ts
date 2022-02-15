import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { User } from '../../interfaces/api';

interface AuthState {
  user: User | null,
  token: string | null,
}

const authSlice = createSlice({
  name: 'auth',
  initialState: { user: null, token: null } as AuthState,
  reducers: {
    setCredentials: (
      state,
      { payload: { data, token }}: PayloadAction<{data: User; token: string}>,
    ) => {
      state.user = data;
      state.token = token;
    },
  },
  // The `extraReducers` field lets the slice handle actions defined elsewhere,
  // including actions generated by createAsyncThunk or in other slices.
});

export const { setCredentials } = authSlice.actions;

export default authSlice.reducer;