import fetchMock, { enableFetchMocks } from 'jest-fetch-mock';

import { authApi } from '../../../redux/auth/auth.api';
import { persistLogingMiddleware } from '../../../redux/auth/auth.middleware';
import authReducer from '../../../redux/auth/auth.slice';
import { setupApiStore } from '../../fixtures/redux/setupApiStore';

enableFetchMocks();

Storage.prototype.setItem = jest.fn();

describe('Auth Api', () => {
  beforeEach((): void => {
    fetchMock.resetMocks();
    jest.clearAllMocks();
  });

  test('request is correct', () => {
    const storeRef = setupApiStore(authApi, [], { auth: authReducer });

    fetchMock.mockResponse(JSON.stringify({}));
    return storeRef.store
      .dispatch<any>(authApi.endpoints.login.initiate({ email: 'eduardoi@gmail', password: '1234' }))
      .then(() => {
        expect(fetchMock).toHaveBeenCalledTimes(1);
        const request = fetchMock.mock.calls[0][0] as Request;
        const { method, url } = request;

        request.json().then((data) => {
          expect(data).toStrictEqual({ email: 'eduardoi@gmail', password: '1234' });
        });

        expect(method).toBe('POST');
        expect(url).toBe(`${process.env.REACT_APP_API_URL}/users/login`);
      });
  });

  test('successful response', () => {
    const storeRef = setupApiStore(authApi, [ persistLogingMiddleware ], { auth: authReducer });
    // const testToken = 'test-123';
    // storeRef.store.dispatch(authActions.login(testToken));
    fetchMock.mockResponse(JSON.stringify({
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
    }));

    return storeRef.store
      .dispatch<any>(authApi.endpoints.login.initiate({ email: 'eduardoi@gmail', password: '1234' }))
      .then((action: any) => {
        const { data } = action;

        expect(localStorage.setItem).toHaveBeenCalledTimes(2);
        expect(localStorage.setItem).toHaveBeenCalledWith('token', 'fakeToken');
        expect(localStorage.setItem).toHaveBeenCalledWith('token-init-date', expect.any(String));

        expect(data).toStrictEqual({
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
        });
      });
  });

  test('unsuccessful response', () => {
    const storeRef = setupApiStore(authApi, [], { auth: authReducer });
    fetchMock.mockReject(new Error('Internal Server Error'));

    return storeRef.store
      .dispatch<any>(
        authApi.endpoints.login.initiate({ email: 'eduardoi@gmail', password: '1234' }),
      )
      .then((action: any) => {
        const { error: { status, error }} = action;
        expect(error).toBe('Error: Internal Server Error');
        expect(status).toBe('FETCH_ERROR');
      });
  });
});
