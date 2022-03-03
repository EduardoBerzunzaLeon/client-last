import reducer, { setDefaultAuthState } from '../../../redux/auth/auth.slice';

describe('Auth slice', () => {
  test('should return the initial state', () => {
    expect(reducer(undefined, { type: 'noExistAction' })).toEqual({
      user: null,
      token: null,
    });
  });

  test('should reset to the initial state', () => {
    const previousState = {
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

    expect(reducer(previousState, setDefaultAuthState())).toEqual({
      user: null,
      token: null,
    });
  });
});
