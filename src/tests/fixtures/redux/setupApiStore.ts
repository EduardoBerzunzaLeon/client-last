import {
  AnyAction,
  combineReducers,
  configureStore,
  Dispatch,
  EnhancedStore,
  Middleware,
  Reducer,
} from '@reduxjs/toolkit';

export function setupApiStore<
    A extends {
      reducer: Reducer<any, any>;
      reducerPath: string;
      middleware: Middleware;
      util: { resetApiState(): any };
    },
    M extends Middleware<{}, any, Dispatch<AnyAction>>,
    R extends Record<string, Reducer<any, any>> = Record<never, never>,
  >(api: A, customMiddlewares?: M[], extraReducers?: R):
   { api: any; store: EnhancedStore } {
  const getStore = (): EnhancedStore => configureStore({
    reducer: combineReducers({
      [api.reducerPath]: api.reducer,
      ...extraReducers,
    }),
    middleware: (gdm) => gdm({ serializableCheck: false, immutableCheck: false })
      .concat(api.middleware, ...(customMiddlewares ?? [])),
  });

    type StoreType = EnhancedStore<
      {
        api: ReturnType<A['reducer']>;
      } & {
        [K in keyof R]: ReturnType<R[K]>;
      },
      AnyAction,
      ReturnType<typeof getStore> extends EnhancedStore<any, any, infer N>
        ? N
        : never
    >;

    const initialStore = getStore() as StoreType;
    const refObj = {
      api,
      store: initialStore,
    };
    const store = getStore() as StoreType;
    refObj.store = store;

    return refObj;
}

export default setupApiStore;
