import { TranslateAuthFields } from '../translate/translateFieldForms';

interface CreateErrorArrayProps {
    errors: string,
    errorsTranslate: TranslateAuthFields,
    setFieldError: (field: string, message: string | undefined) => void
}

export const createErrorsArray = (
  { errors, errorsTranslate, setFieldError }: CreateErrorArrayProps,
) => {
  if (errors) {
    const errorsArray = errors.split('.');
    const keys = Object.keys(errorsTranslate);

    errorsArray.forEach((error) => {
      keys.forEach((key) => {
        if (error.includes(errorsTranslate[key as keyof TranslateAuthFields])) {
          setFieldError(key, error);
        }
      });
    });
  }
};

export default { createErrorsArray };
