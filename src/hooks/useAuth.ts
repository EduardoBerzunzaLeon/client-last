import { useMemo } from 'react';

import { useSelector } from 'react-redux';

import { selectCurrentUser } from '../redux/auth/auth.selectors';

export const useAuth = () => {
  const user = useSelector(selectCurrentUser);
  return useMemo(() => ({ user }), [ user ]);
};

export default useAuth;
