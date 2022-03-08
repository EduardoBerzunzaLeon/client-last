import React, { Suspense } from 'react';
import { AnyAction, EnhancedStore, Middleware } from '@reduxjs/toolkit';
import { MemoryRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { ReactWrapper } from 'enzyme';

import { authApi } from '../../redux/auth/auth.api';
import { authState, uiState } from './testData/fakeStoreData';
import { setupApiStore } from './redux/setupApiStore';
import authReducer from '../../redux/auth/auth.slice';
import uiReducer from '../../redux/ui/ui.slice';

declare type Middlewares<S> = ReadonlyArray<Middleware<{}, S>>;
export declare type Wrapper = ReactWrapper<any, Readonly<{}>, React.Component<{}, {}, any>>;

interface Props {
  initialEntries?: string,
  store?: EnhancedStore
  children?: JSX.Element
}

export interface StoreRef {
  api: any;
  store: EnhancedStore<any, AnyAction, Middlewares<any>>;
}

export const storeRef: StoreRef = setupApiStore(authApi, [], { auth: authReducer });

export const mockStore = <P extends Object>(state?: P): StoreRef => {
  const initialState = { auth: authState, ui: uiState };
  const finalState = state ? { ...initialState, ...state } : { ...initialState };
  return setupApiStore(
    authApi,
    [],
    { auth: authReducer, ui: uiReducer },
    finalState,
  );
};

export const render = (
  Component: React.ComponentType,
  store = storeRef.store,
) => (
  <Provider store={store}>
    <Component />
  </Provider>
);

export const renderWithProps = <P extends object>(
  Component: React.ComponentType<P>,
  props: P,
  { initialEntries = '/', store = storeRef.store }: Props,
) => (
  <Provider store={store}>
    <Suspense fallback="cargando">
      <MemoryRouter initialEntries={[ initialEntries ]}>
        <Component {...props} />
      </MemoryRouter>
    </Suspense>
  </Provider>
  );

export const renderWithRouter = (
  Component: React.ComponentType,
  { initialEntries = '/', store = storeRef.store }: Props,
) => (
  <Provider store={store}>
    <Suspense fallback="cargando">
      <MemoryRouter initialEntries={[ initialEntries ]}>
        <Component />
      </MemoryRouter>
    </Suspense>
  </Provider>
);

export const renderWithChildren = (
  Component: (({ children }: { children: JSX.Element; }) => JSX.Element),
  { initialEntries = '/', store = storeRef.store, children = <span>empty</span> }: Props,
) => (
  <Provider store={store}>
    <Suspense fallback="cargando">
      <MemoryRouter initialEntries={[ initialEntries ]}>
        <Component>
          { children }
        </Component>
      </MemoryRouter>
    </Suspense>
  </Provider>
);

export default {
  mockStore,
  render,
  renderWithChildren,
  renderWithProps,
  renderWithRouter,
  storeRef,
};
