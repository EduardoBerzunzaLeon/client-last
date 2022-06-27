import { setAuthFormErrors, processError } from '../../../utils';
import { errorResponse } from '../../fixtures/testData/fakeUtilsData';

describe('Handler Errors Forms', () => {
  test('should  call processError callback param correctly', () => {
    const showError = jest.fn();
    const detail = processError({ error: errorResponse, showError });
    expect(detail).toBe(errorResponse.data.error.message);
    expect(showError).toBeCalledWith({ detail });
  });

  test('should call callback with the error lenght', () => {
    const setFieldError = jest.fn();
    setAuthFormErrors({ setFieldError, errors: 'contraseña no es valida. nombre es requerido' });
    expect(setFieldError).toBeCalledTimes(2);
  });
});
