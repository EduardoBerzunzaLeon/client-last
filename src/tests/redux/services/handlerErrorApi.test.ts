import { getDetailError, isErrorResponseApiType } from '../../../redux/services/handlerErrorApi';
import { errorResponse } from '../../fixtures/testData/fakeUtilsData';

describe('Handler Error API', () => {
  describe('isErrorResponseApiType method', () => {
    test('should return false when send a string', () => {
      const isError = isErrorResponseApiType('isNotAnObject');
      expect(isError).toBeFalsy();
    });

    test('should return false when send an object without data attribute', () => {
      const isError = isErrorResponseApiType({ notData: 'noData' });
      expect(isError).toBeFalsy();
    });

    test('should return false when send an object with data attribute', () => {
      const isError = isErrorResponseApiType({ data: 'noError' });
      expect(isError).toBeFalsy();
    });

    test('should return true when send an object with data attribute', () => {
      const isError = isErrorResponseApiType(errorResponse);
      expect(isError).toBeTruthy();
    });
  });

  describe('getDetailError', () => {
    test('should return a string with Error en el servidor', () => {
      const errorMsg = getDetailError({ genericError: { error: 'fetch error' }});
      expect(errorMsg).toBe('Error en el servidor');
    });

    test('should return an ErrorResponse message', () => {
      const errorMsg = getDetailError(errorResponse);
      expect(errorMsg).toBe(errorResponse.data.error.message);
    });
  });
});
