import { Generic } from '../../interfaces/generic';
import { MessageProps } from '../../interfaces/ui/hooks/hooksInterface';
import { getDetailError } from '../../redux/services/handlerErrorApi';
import { translateAuthFields, TranslateAuthFields } from '../translate/translateFieldForms';

interface ErrorProps {
  errors: string,
  setFieldError: (field: string, message: string | undefined) => void
}

interface ProcessProps {
  error: unknown,
  showError: ({ detail, life }: MessageProps) => void
}

export const processError = ({ error, showError }: ProcessProps) => {
  const detail: string = getDetailError(error);
  showError({ detail });
  return detail;
};

export const createErrorsArray = <T extends Generic>(errorsTranslate: T) => (
  { setFieldError, errors }: ErrorProps,
) => {
  if (errors) {
    const errorsArray = errors.split('.');
    const keys = Object.keys(errorsTranslate);

    errorsArray.forEach((error) => {
      keys.forEach((key) => {
        if (error.includes(errorsTranslate[key as keyof T])) {
          setFieldError(key, error);
        }
      });
    });
  }
};

export const errorTranslateAuthForm = createErrorsArray<TranslateAuthFields>(translateAuthFields);

export default { createErrorsArray, errorTranslateAuthForm };
