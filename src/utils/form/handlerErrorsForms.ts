import { TranslateAuthFields } from '../translate/translateFieldForms';

interface Generic {
  [x: string]: any
}

interface CreateErrorArrayProps<T> {
    errors: string,
    errorsTranslate: T,
    setFieldError: (field: string, message: string | undefined) => void
}

interface GenericIndentityFn<Type>{
  (arg: CreateErrorArrayProps<Type>) :void
}

export const createErrorsArray = <T extends Generic>(
  { errors, errorsTranslate, setFieldError }: CreateErrorArrayProps<T>,
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

export const errorTranslateAuthForm: GenericIndentityFn<TranslateAuthFields> = createErrorsArray;

export default { createErrorsArray, errorTranslateAuthForm };
