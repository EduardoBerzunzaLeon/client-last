import { ErrorResponse } from '../../interfaces/api';

export const isErrorResponseApiType = (error: any): error is ErrorResponse => ('data' in error && 'error' in error.data);

export const getDetailError = (err: unknown): string => (isErrorResponseApiType(err)
  ? err.data.error.message
  : 'Error en el servidor');

export default { isErrorResponseApiType, getDetailError };
