import React from 'react';

import { getDetailError } from '../../../redux/services/handlerErrorApi';
import { HeaderAdmin } from '../../../components/headerAdmin/HeaderAdmin';
import { useGetUsersQuery } from '../../../redux/user/user.api';
import ErrorCard from '../../../components/errorCard/ErrorCard';
import Spinner from '../../../components/spinner/Spinner';
import { UsersResponse } from '../../../interfaces/api';

interface Props {
  data: UsersResponse | undefined,
  isLoading: boolean;
  isError: boolean;
  error: unknown | undefined;
}

const HeaderTest = () => <HeaderAdmin position="users" title="Usuarios" />;

const withSpinner = <P extends object>
  (Component: React.ComponentType<P>, {
    data, isLoading, isError, error,
  } : Props) => (props: P) => {
    if (isLoading) {
      return <Spinner message="Cargando Usuarios" />;
    }

    if (isError || !data) {
      return (
        <ErrorCard
          title="Ocurrio un error en su petición"
          detail={error ? getDetailError(error) : 'No se encontraron usuarios'}
        />
      );
    }

    const { data: dataSend } = data;

    return (
      <Component
        {...props}
        data={dataSend}
      />
    );
  };

const UsersScreen = () => {
  const {
    data, isLoading, isError, error,
  } = useGetUsersQuery();

  // if (isLoading) {
  //   return <Spinner message="Cargando Usuarios" />;
  // }

  // if (isError || !data) {
  //   return (
  //     <ErrorCard
  //       title="Ocurrio un error en su petición"
  //       detail={error ? getDetailError(error) : 'No se encontraron usuarios'}
  //     />
  //   );
  // }

  return withSpinner(
    HeaderTest,
    {
      data, isLoading, isError, error,
    },
  );
};

export default UsersScreen;
