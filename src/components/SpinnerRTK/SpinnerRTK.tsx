import { ReactElement } from 'react';
import { getErrorDetail } from '../../redux/services/error.service';
import { Spinner } from '../spinner/Spinner';
import { ErrorCard } from '../errorCard/ErrorCard';

interface Response {
    data: any,
    status: string,
    total?: number,
}

interface Props<T> {
    data: T | undefined,
    error: any
    isError: boolean,
    isLoading: boolean,
    children: (response: T) => ReactElement | ReactElement[],
    messageError?: string,
    messageLoading?: string,
}

export const SpinnerRTK = <T extends Response>({
  children,
  messageError,
  messageLoading,
  data,
  error,
  isError,
  isLoading,
}: Props<T>) => {
  if (isLoading) {
    return <Spinner message={messageLoading!} />;
  }

  if (isError || !data) {
    return (
      <ErrorCard
        title="Ocurrio un error en su petición"
        detail={error ? getErrorDetail(error) : messageError!}
      />
    );
  }

  return (
    <>
      {children(data)}
    </>
  );
};

SpinnerRTK.defaultProps = {
  messageError: 'No se encontro la información solicitada',
  messageLoading: 'Cargando Información',
};

export default SpinnerRTK;
