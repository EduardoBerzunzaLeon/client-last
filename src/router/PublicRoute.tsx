import { Navigate, useLocation } from 'react-router-dom';

import { useAuth } from '../hooks/useAuth';

interface LocationProps {
  state: { from?: { pathname: string} } | null
}

export const PublicRoute = ({ children }: { children: JSX.Element }) => {
  const { user } = useAuth();
  const location = useLocation() as LocationProps;

  return user
    ? (
      <Navigate
        to={location.state?.from?.pathname || '/admin'}
        state={{ from: location }}
        replace
      />
    )
    : children;
};

export default PublicRoute;
