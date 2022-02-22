import { RootState } from '../store';

export const selectSiderStatus = (state: RootState) => state.ui.siderOpen;

export default {
  selectSiderStatus,
};
