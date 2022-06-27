import { Generic, MessageProps } from '../../interfaces';
import { getErrorDetail } from '../../redux/services/error.service';


import { authFieldsTranslation, AuthFieldsTranslation } from '../translation/authFields';
import { professorFieldsTranslation, ProfessorFieldsTranslation } from '../translation/professorField';
import { subjectFieldsTranslation, SubjectFieldsTranslation } from '../translation/subjectFields';
import { studentFieldsTranslation, StudentFieldsTranslation } from '../translation/studentField';
import { professorInHistoryFieldsTranslation, ProfessorInHistoryFieldsTranslation } from '../translation/professorInHistoryField';

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
export const setSubjectFormErrors = handlerFormErrors<SubjectFieldsTranslation>(
  subjectFieldsTranslation,
);
export const setProfessorFormErrors = handlerFormErrors<ProfessorFieldsTranslation>(
  professorFieldsTranslation,
);

export const setStudentFormErrors = handlerFormErrors<StudentFieldsTranslation>(
  studentFieldsTranslation,
);

export const setProfessorInHistoryFormErrors = handlerFormErrors<
  ProfessorInHistoryFieldsTranslation
>(professorInHistoryFieldsTranslation);

export default {
  handlerFormErrors,
  setAuthFormErrors,
  setSubjectFormErrors,
  setProfessorFormErrors,
  setStudentFormErrors,
  setProfessorInHistoryFormErrors,
};
