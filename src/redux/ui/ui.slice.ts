import { createSlice } from '@reduxjs/toolkit';

interface UIState {
    siderOpen: boolean;
}

const uiSlice = createSlice({
  name: 'ui',
  initialState: { siderOpen: false } as UIState,
  reducers: {
    openSider: (state) => {
      state.siderOpen = true;
    },
    closeSider: (state) => {
      state.siderOpen = false;
    },
  },
});

export const { openSider, closeSider } = uiSlice.actions;

export default uiSlice.reducer;
