import { AuthState } from '../../../redux/auth/auth.slice';
import { SchoolYearState } from '../../../redux/schoolYear/schoolYear.slice';
import { UIState } from '../../../redux/ui/ui.slice';
import { userLogged } from './fakeAuthData';

export const authState: AuthState = {
  user: userLogged.data,
  token: 'fakeToken',
};

export const uiState: UIState = {
  siderOpen: false,
};

export const schoolYearState: SchoolYearState = {
  firstPhase: null,
  secondPhase: null,
  beforeSchoolYear: null,
  period: { start: 2022, end: 2023 },
  currentPhase: 1,
};

export default {
  authState,
  uiState,
  schoolYearState,
};
