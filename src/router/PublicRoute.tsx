import { Navigate, useLocation } from 'react-router-dom';
import useAuth from '../hooks/useAuth';

const PublicRoute = ({ children }: { children: JSX.Element }) => {
  const { user } = useAuth();
  const location = useLocation();

  return user
    ? <Navigate to="/admin" state={{ from: location }} replace />
    : children;
};

export default PublicRoute;
