import reducer, { setDefaultAuthState } from '../../../redux/auth/auth.slice';
import { userLogged } from '../../fixtures/testData/fakeAuthData';

describe('Auth slice', () => {
  test('should return the initial state', () => {
    expect(reducer(undefined, { type: 'noExistAction' })).toEqual({
      user: null,
      token: null,
    });
  });

  test('should reset to the initial state', () => {
    const previousState = {
      user: userLogged.data,
      token: userLogged.token,
    };

    expect(reducer(previousState, setDefaultAuthState())).toEqual({
      user: null,
      token: null,
    });
  });
});
