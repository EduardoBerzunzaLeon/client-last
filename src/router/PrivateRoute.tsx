import { Navigate, useLocation } from 'react-router-dom';

import { useAuth } from '../hooks/useAuth';

export const PrivateRoute = ({ children }: { children: JSX.Element }) => {
  const { user } = useAuth();
  const location = useLocation();

  return user
    ? children
    : <Navigate to="/login" state={{ from: location }} replace />;
};

export default PrivateRoute;
