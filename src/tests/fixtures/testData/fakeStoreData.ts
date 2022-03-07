import { AuthState } from '../../../redux/auth/auth.slice';
import { UIState } from '../../../redux/ui/ui.slice';

export const authState: AuthState = {
  user: {
    email: 'eduardo@gmail.com',
    name: {
      first: 'test',
      last: 'lastTest',
    },
    gender: 'M',
    role: 'Admin',
    avatar: 'https:/url/myimage.jpg',
  },
  token: 'fakeToken',
};

export const uiState: UIState = {
  siderOpen: false,
};

export default {
  authState,
  uiState,
};
