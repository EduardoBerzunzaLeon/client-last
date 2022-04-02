import React from 'react';

import { getDetailError } from '../../redux/services/handlerErrorApi';
import ErrorCard from '../errorCard/ErrorCard';
import Spinner from '../spinner/Spinner';

export const withSpinnerRTK = <P extends object>
  (Component: React.ComponentType<P>, useQueryRTK: (...x: any[]) => any, params?: any) => (props: Omit<P, 'data'>) => {
    const {
      data, isLoading, isError, error,
    } = useQueryRTK(params);

    if (isLoading) {
      return <Spinner message="Cargando Información" />;
    }

    if (isError || !data) {
      return (
        <ErrorCard
          title="Ocurrio un error en su petición"
          detail={error ? getDetailError(error) : 'No se encontro la información solicitada'}
        />
      );
    }

    const { data: dataSend } = data;

    return (
      <Component
        {...props as P}
        data={dataSend}
      />
    );
  };

export default withSpinnerRTK;
