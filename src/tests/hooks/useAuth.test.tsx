import React from 'react';

import { Provider } from 'react-redux';
import { renderHook } from '@testing-library/react-hooks';
import fetchMock, { enableFetchMocks } from 'jest-fetch-mock';

import { authApi } from '../../redux/auth/auth.api';
import { loginFakeData, userLogged } from '../fixtures/testData/fakeAuthData';
import { storeRef } from '../fixtures/render';
import useAuth from '../../hooks/useAuth';

interface Props {
  children: React.ReactNode
}
enableFetchMocks();

describe('useAuth', () => {
  let wrapper: React.FC<Props>;

  beforeEach((): void => {
    fetchMock.resetMocks();
    wrapper = ({ children }: Props) => (
      <Provider store={storeRef.store}>
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
