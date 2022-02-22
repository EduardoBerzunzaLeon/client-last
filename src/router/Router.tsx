import { BrowserRouter } from 'react-router-dom';
import { useEffect } from 'react';

import { setCredentials, setDefaultAuthState } from '../redux/auth/auth.slice';
import { useAppDispatch } from '../redux/hooks';
import { useRenewTokenMutation } from '../redux/auth/auth.api';
import Routes from './routes/Routes';
import Spinner from '../components/spinner/Spinner';

const Router = () => {
  const dispatch = useAppDispatch();
  const [ renewToken, { isLoading }] = useRenewTokenMutation();

  useEffect(() => {
    renewToken().unwrap()
      .then((user) => dispatch(setCredentials(user)))
      .catch(() => setDefaultAuthState());
  }, [ renewToken ]);

  return (
    <div>
      {
        isLoading ? <Spinner message="Cargando..." /> : (
          <BrowserRouter>
            <Routes />
          </BrowserRouter>
        )
      }
    </div>
  );
};

export default Router;
