import { AuthState } from '../../../redux/auth/auth.slice';
import { UIState } from '../../../redux/ui/ui.slice';
import { userLogged } from './fakeAuthData';

export const authState: AuthState = {
  user: userLogged.data,
  token: 'fakeToken',
};

export const uiState: UIState = {
  siderOpen: false,
};

export default {
  authState,
  uiState,
};
