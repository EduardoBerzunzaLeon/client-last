import { RootState } from '../store';

// Other code such as selectors can use the imported `RootState` type
export const selectCurrentUser = (state: RootState) => state.auth.user;

export default {
  selectCurrentUser,
};
