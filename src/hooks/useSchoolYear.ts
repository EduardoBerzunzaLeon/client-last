import { useMemo } from 'react';

import { useSelector } from 'react-redux';
import { selectSchoolYear } from '../redux/schoolYear/schoolYear.selectors';

export const useSchoolYear = () => {
  const schoolYear = useSelector(selectSchoolYear);
  return useMemo(() => ({ schoolYear }), [ schoolYear ]);
};

export default useSchoolYear;
