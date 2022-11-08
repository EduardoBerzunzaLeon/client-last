import { createSlice } from '@reduxjs/toolkit';
import {
  PhaseSchoolYear, BeforeSchoolYear, Period,
} from '../../interfaces';

// eslint-disable-next-line import/no-cycle
import { schoolYearApi } from './schoolYear.api';

export interface SchoolYearState {
    firstPhase: PhaseSchoolYear | null;
    secondPhase: PhaseSchoolYear | null;
    beforeSchoolYear: BeforeSchoolYear | null;
    period: Period | null;
    currentPhase: string | null;
}

const schoolYearSlice = createSlice({
  name: 'auth',
  initialState: {
    firstPhase: null,
    secondPhase: null,
    beforeSchoolYear: null,
    period: null,
    currentPhase: null,
  } as SchoolYearState,
  reducers: {
    setDefaultSchoolYearState: (state) => {
      state.firstPhase = null;
      state.secondPhase = null;
      state.beforeSchoolYear = null;
      state.period = null;
      state.currentPhase = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addMatcher(
        schoolYearApi.endpoints.getSchoolYear.matchFulfilled,
        (state, { payload }) => {
          const {
            firstPhase, secondPhase, beforeSchoolYear, period,
          } = payload.data;

          const newSchoolYear = {
            firstPhase,
            secondPhase,
            beforeSchoolYear,
            period,
            currentPhase: payload?.data.secondPhase?.user ? '2' : '1',
          };

          Object.assign(state, newSchoolYear);
        },
      );
  },
});

export const { setDefaultSchoolYearState } = schoolYearSlice.actions;

export default schoolYearSlice.reducer;
