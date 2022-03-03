import { ErrorResponse } from '../../interfaces/api';

export const isErrorResponseApiType = (error: any): error is ErrorResponse => {
  const msg = error?.data?.error?.message;
  return (typeof msg !== 'undefined');
};

export const getDetailError = (err: unknown): string => (isErrorResponseApiType(err)
  ? err.data.error.message
  : 'Error en el servidor');

export default { isErrorResponseApiType, getDetailError };
