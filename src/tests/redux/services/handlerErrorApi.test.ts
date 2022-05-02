import { getErrorDetail, isAPIResponseError } from '../../../redux/services/handlerErrorApi';
import { errorResponse } from '../../fixtures/testData/fakeUtilsData';

describe('Handler Error API', () => {
  describe('isAPIResponseError method', () => {
    test('should return false when send a string', () => {
      const isError = isAPIResponseError('isNotAnObject');
      expect(isError).toBeFalsy();
    });

    test('should return false when send an object without data attribute', () => {
      const isError = isAPIResponseError({ notData: 'noData' });
      expect(isError).toBeFalsy();
    });

    test('should return false when send an object with data attribute', () => {
      const isError = isAPIResponseError({ data: 'noError' });
      expect(isError).toBeFalsy();
    });

    test('should return true when send an object with data attribute', () => {
      const isError = isAPIResponseError(errorResponse);
      expect(isError).toBeTruthy();
    });
  });

  describe('getErrorDetail', () => {
    test('should return a string with Error en el servidor', () => {
      const errorMsg = getErrorDetail({ genericError: { error: 'fetch error' }});
      expect(errorMsg).toBe('Error en el servidor');
    });

    test('should return an ErrorResponse message', () => {
      const errorMsg = getErrorDetail(errorResponse);
      expect(errorMsg).toBe(errorResponse.data.error.message);
    });
  });
});
