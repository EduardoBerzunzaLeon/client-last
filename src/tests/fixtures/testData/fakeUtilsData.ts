import { ErrorResponse } from '../../../interfaces/api/responses/errorInterface';

export const errorResponse: ErrorResponse = {
  status: 401,
  data: {
    status: 'error',
    error: {
      isOperational: true,
      statusCode: 401,
      status: 'error',
      message: 'Unauthorized error',
    },
  },
};

export const generateError = (message: string, status: number):ErrorResponse => ({
  status,
  data: {
    status: 'error',
    error: {
      isOperational: true,
      statusCode: status,
      status: 'error',
      message,
    },
  },
});

export default {
  errorResponse,
  generateError,
};
