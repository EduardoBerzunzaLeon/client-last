import React, { Suspense } from 'react';
import { Provider } from 'react-redux';
import { MemoryRouter } from 'react-router-dom';
import { EnhancedStore } from '@reduxjs/toolkit';

import { authApi } from '../../redux/auth/auth.api';
import { setupApiStore } from './redux/setupApiStore';
import authReducer from '../../redux/auth/auth.slice';

export const storeRef = setupApiStore(authApi, [], { auth: authReducer });

interface Props {
  initialEntries?: string,
  store?: EnhancedStore
  children?: JSX.Element
}

export const render = (
  Component: React.ComponentType,
  store = storeRef.store,
) => (
  <Provider store={store}>
    <Component />
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
  render,
  renderWithRouter,
  renderWithChildren,
  storeRef,
};
