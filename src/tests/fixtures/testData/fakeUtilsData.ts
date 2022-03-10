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

export default {
  errorResponse,
};
