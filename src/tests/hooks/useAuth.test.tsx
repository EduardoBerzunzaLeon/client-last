import React from 'react';

import fetchMock, { enableFetchMocks } from 'jest-fetch-mock';
import { renderHook } from '@testing-library/react-hooks';

import { Provider } from 'react-redux';
import { authApi } from '../../redux/auth/auth.api';
import { setupApiStore } from '../fixtures/redux/setupApiStore';
import authReducer from '../../redux/auth/auth.slice';
import useAuth from '../../hooks/useAuth';
import { loginFakeData, userLogged } from '../fixtures/testData/fakeAuthData';

enableFetchMocks();

interface Props {
  children: React.ReactNode
}

describe('useAuth', () => {
  const storeRef = setupApiStore(authApi, [], { auth: authReducer });
  let wrapper: React.FC<Props>;

  beforeEach((): void => {
    fetchMock.resetMocks();
    wrapper = ({ children }: Props) => (
      <Provider
        store={storeRef.store}
      >
        {children}
      </Provider>
    );
  });

  test('should return user null by default', () => {
    fetchMock.mockResponse(JSON.stringify({}));
    const { result } = renderHook(
      () => useAuth(),
      { wrapper },
    );

    const { user } = result.current;
    expect(user).toBeNull();
  });

  test('should return user logged', async () => {
    fetchMock.mockResponse(JSON.stringify(userLogged));
    storeRef.store.dispatch<any>(authApi.endpoints.login.initiate(loginFakeData));

    const { result, waitForNextUpdate } = renderHook(
      () => useAuth(),
      { wrapper },
    );

    await waitForNextUpdate();
    const { user } = result.current;
    expect(user).toStrictEqual(userLogged.data);
  });
});
