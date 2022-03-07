import { BrowserRouter } from 'react-router-dom';
import { Suspense, useEffect } from 'react';

import { setDefaultAuthState } from '../redux/auth/auth.slice';
import { useAppDispatch } from '../redux/hooks';

import { useRenewTokenQuery } from '../redux/auth/auth.api';
import Routes from './routes/Routes';
import Spinner from '../components/spinner/Spinner';

const Router = () => {
  const dispatch = useAppDispatch();
  const { isLoading, isError } = useRenewTokenQuery();

  useEffect(() => {
    if (isError) {
      dispatch(setDefaultAuthState());
    }
  }, [ isError ]);

  return (
    <div>
      {
        isLoading ? <Spinner message="Cargando Aplicación..." /> : (
          <Suspense fallback={<Spinner message="Cargando Módulo..." />}>
            <BrowserRouter>
              <Routes />
            </BrowserRouter>
          </Suspense>
        )
      }
    </div>
  );
};

export default Router;
