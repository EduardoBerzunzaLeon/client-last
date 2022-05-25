import { useEffect, useState } from 'react';

interface Props {
    isFetching: boolean,
    hasData: boolean,
    hasEntitySelected: boolean,
}

export const useModalLogin = ({
  isFetching,
  hasData,
  hasEntitySelected,
}: Props) => {
  const [ isLoading, setIsLoading ] = useState(true);

  useEffect(() => {
    (!isFetching && hasData)
          && setIsLoading(false);

    (!hasEntitySelected)
          && setIsLoading(true);
  }, [ hasData, isFetching, hasEntitySelected ]);

  return { isLoading };
};

export default useModalLogin;
