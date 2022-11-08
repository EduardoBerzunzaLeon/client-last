// import { useState } from 'react';
import { Navigate, useLocation } from 'react-router-dom';

import { useAuth } from '../hooks';
// import { useGetSchoolYearQuery } from '../redux/schoolYear/schoolYear.api';

export const PrivateRoute = ({ children }: { children: JSX.Element }) => {
  const { user } = useAuth();
  const location = useLocation();
  // const [ skipSchool, setSkipSchool ] = useState<boolean>(true);

  // const {
  //   isLoading,
  //   isError,
  // } = useGetSchoolYearQuery(undefined, { skip: skipSchool });

  return user
    ? children
    : <Navigate to="/login" state={{ from: location }} replace />;
};

export default PrivateRoute;
