import { Navigate, useLocation } from 'react-router-dom';
import useAuth from '../hooks/useAuth';

const PublicRoute = ({ children }: {children: JSX.Element}) => {
  const { user } = useAuth();
  const location = useLocation();

  if (user) {
    return <Navigate to="/admin" state={{ from: location }} replace />;
  }

  return children;
};

export default PublicRoute;
