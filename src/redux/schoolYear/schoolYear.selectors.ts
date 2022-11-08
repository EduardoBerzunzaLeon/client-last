import { RootState } from '../store';

export const selectSchoolYear = (state: RootState) => state.schoolYear;

export default {
  selectSchoolYear,
};
