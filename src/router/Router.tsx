import { BrowserRouter } from 'react-router-dom';
import { useEffect } from 'react';

import { setCredentials, setDefaultAuthState } from '../redux/auth/auth.slice';
import { useAppDispatch } from '../redux/hooks';
import { useRenewTokenMutation } from '../redux/auth/auth.api';
import Routes from './routes/Routes';

const Router = () => {
  const dispatch = useAppDispatch();
  const [ renewToken ] = useRenewTokenMutation();

  useEffect(() => {
    renewToken().unwrap()
      .then((user) => dispatch(setCredentials(user)))
      .catch(() => setDefaultAuthState());
  }, [ renewToken ]);

  return (
    <BrowserRouter>
      <Routes />
    </BrowserRouter>
  );
};

export default Router;
