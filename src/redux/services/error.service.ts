import { ErrorResponse } from '../../interfaces';

export const isAPIResponseError = (error: any): error is ErrorResponse => {
  const msg = error?.data?.error?.message;
  return (typeof msg !== 'undefined');
};

export const getErrorDetail = (err: unknown): string => (isAPIResponseError(err)
  ? err.data.error.message
  : 'Error en el servidor');

export default { isAPIResponseError, getErrorDetail };
