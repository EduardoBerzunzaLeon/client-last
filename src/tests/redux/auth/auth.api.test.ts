import fetchMock, { enableFetchMocks } from 'jest-fetch-mock';

import { authApi } from '../../../redux/auth/auth.api';
import { loginFakeData, userLogged } from '../../fixtures/testData/fakeAuthData';
import { setupApiStore } from '../../fixtures/redux/setupApiStore';
import authReducer from '../../../redux/auth/auth.slice';

enableFetchMocks();

Storage.prototype.setItem = jest.fn();

describe('Auth Api', () => {
  beforeEach((): void => {
    fetchMock.resetMocks();
    jest.clearAllMocks();
  });

  test('should have a correct request in enpoint', async () => {
    const storeRef = setupApiStore(authApi, [], { auth: authReducer });

    fetchMock.mockResponse(JSON.stringify({}));
    await storeRef.store.dispatch<any>(authApi.endpoints.login.initiate(loginFakeData));

    const request = fetchMock.mock.calls[0][0] as Request;
    const { method, url } = request;
    const data = await request.json();

    expect(data).toStrictEqual(loginFakeData);
    expect(fetchMock).toHaveBeenCalledTimes(1);
    expect(method).toBe('POST');
    expect(url).toBe(`${process.env.REACT_APP_API_URL}/users/login`);
  });

  test('should have a successful response in enpoint', async () => {
    const storeRef = setupApiStore(authApi, [], { auth: authReducer });

    fetchMock.mockResponse(JSON.stringify(userLogged));

    const { data } = await storeRef.store
      .dispatch<any>(authApi.endpoints.login.initiate(loginFakeData));

    expect(data).toStrictEqual(userLogged);
  });

  test('should have an unsuccessful response in enpoint', async () => {
    const storeRef = setupApiStore(authApi, [], { auth: authReducer });
    fetchMock.mockReject(new Error('Internal Server Error'));

    const { error: { status, error }} = await storeRef.store
      .dispatch<any>(
        authApi.endpoints.login.initiate(loginFakeData),
      );

    expect(error).toBe('Error: Internal Server Error');
    expect(status).toBe('FETCH_ERROR');
  });
});
