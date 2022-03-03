import fetchMock, { enableFetchMocks } from 'jest-fetch-mock';

import { authApi } from '../../../redux/auth/auth.api';
import { loginFakeData, userLogged, forgotPasswordFakeData } from '../../fixtures/testData/fakeAuthData';
import { persistLogingMiddleware } from '../../../redux/auth/auth.middleware';
import { setupApiStore } from '../../fixtures/redux/setupApiStore';
import authReducer, { setDefaultAuthState } from '../../../redux/auth/auth.slice';

enableFetchMocks();

Storage.prototype.setItem = jest.fn();
Storage.prototype.clear = jest.fn();

describe('Auth middleware', () => {
  beforeEach((): void => {
    fetchMock.resetMocks();
    jest.clearAllMocks();
  });

  test('should save in localStorage token and token-init-date', async () => {
    const storeRef = setupApiStore(authApi, [ persistLogingMiddleware ], { auth: authReducer });

    fetchMock.mockResponse(JSON.stringify(userLogged));

    const { data } = await storeRef.store
      .dispatch<any>(authApi.endpoints.login.initiate(loginFakeData));

    expect(localStorage.setItem).toHaveBeenCalledTimes(2);
    expect(localStorage.setItem).toHaveBeenCalledWith('token', 'fakeToken');
    expect(localStorage.setItem).toHaveBeenCalledWith('token-init-date', expect.any(String));

    expect(data).toStrictEqual(userLogged);
  });

  test('should not call the localStorage', async () => {
    const storeRef = setupApiStore(authApi, [ persistLogingMiddleware ], { auth: authReducer });

    fetchMock.mockResponse(JSON.stringify(userLogged));

    const { data } = await storeRef.store
      .dispatch<any>(authApi.endpoints.forgotPassword.initiate(forgotPasswordFakeData));

    expect(localStorage.setItem).toHaveBeenCalledTimes(0);
    expect(data).toStrictEqual(userLogged);
  });

  test('should call clear method in localStorge', async () => {
    const storeRef = setupApiStore(authApi, [ persistLogingMiddleware ], { auth: authReducer });
    storeRef.store.dispatch(setDefaultAuthState());
    fetchMock.mockResponse(JSON.stringify({}));

    expect(localStorage.clear).toHaveBeenCalledTimes(1);
    expect(localStorage.setItem).toHaveBeenCalledTimes(0);
  });
});
