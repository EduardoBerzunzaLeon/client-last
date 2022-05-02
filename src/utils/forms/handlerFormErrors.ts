import { Generic } from '../../interfaces/generic';
import { MessageProps } from '../../interfaces/ui/hooks/hooksInterface';
import { getErrorDetail } from '../../redux/services/handlerErrorApi';
import { authFieldsTranslation, AuthFieldsTranslation } from '../translation/authFields';

interface Error {
  errors: string,
  setFieldError: (field: string, message: string | undefined) => void
}

interface ProcessError {
  error: unknown,
  showError: ({ detail, life }: MessageProps) => void
}

export const processError = ({ error, showError }: ProcessError) => {
  const detail: string = getErrorDetail(error);
  showError({ detail });
  return detail;
};

export const handlerFormErrors = <T extends Generic>(errorTranslation: T) => (
  { setFieldError, errors }: Error,
) => {
  if (errors) {
    const errorsArray = errors.split('.');
    const keys = Object.keys(errorTranslation);

    errorsArray.forEach((error) => {
      keys.forEach((key) => {
        if (error.includes(errorTranslation[key as keyof T])) {
          setFieldError(key, error);
        }
      });
    });
  }
};

export const setAuthFormErrors = handlerFormErrors<AuthFieldsTranslation>(authFieldsTranslation);

export default { handlerFormErrors, setAuthFormErrors };
