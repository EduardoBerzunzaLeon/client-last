import { BrowserRouter } from 'react-router-dom';
import { Suspense, useEffect } from 'react';

import { setDefaultAuthState } from '../redux/auth/auth.slice';
import { useAppDispatch } from '../redux/hooks';
import { useRenewTokenMutation } from '../redux/auth/auth.api';
import Routes from './routes/Routes';
import Spinner from '../components/spinner/Spinner';

const Router = () => {
  const dispatch = useAppDispatch();
  const [ renewToken, { isLoading }] = useRenewTokenMutation();

  useEffect(() => {
    renewToken().unwrap()
      .catch(() => dispatch(setDefaultAuthState()));
  }, [ renewToken ]);

  return (
    <div>
      {
        isLoading ? <Spinner message="Cargando..." /> : (
          <Suspense fallback={<Spinner message="Cargando..." />}>
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
