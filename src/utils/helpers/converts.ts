import {
  AllowedRoles, Generic, RequiredSubjects, SingleSubject,
} from '../../interfaces';
import { ucWords } from './stringUtils';

export const convertAdditionalSubjects = (
  requiredSubjects: SingleSubject[],
): RequiredSubjects[] => {
  const subjects = requiredSubjects.map((subject) => ({
    // eslint-disable-next-line no-underscore-dangle
    id: subject._id,
    name: ucWords(subject.name),
  }));

  return subjects;
};

export const convertModelToFormData = (model: Generic, form?: FormData, namespace = ''): FormData => {
  const formData = form || new FormData();

  if (typeof model === 'string') {
    formData.append(namespace, model);
  } else {
    Object.keys(model).forEach((key) => {
      if (!model[key]) {
        return;
      }
      const formKey = namespace ? `${namespace}[${key}]` : key;
      if (model[key] instanceof Date) {
        formData.append(formKey, model[key].toISOString());
      } else if (model[key] instanceof Array) {
        model[key].forEach((element: any, index: number) => {
          const tempFormKey = `${formKey}[${index}]`;
          convertModelToFormData(element, formData, tempFormKey);
        });
      } else if (typeof model[key] === 'object' && !(model[key] instanceof File)) {
        convertModelToFormData(model[key], formData, formKey);
      } else if (model[key] instanceof File) {
        formData.append(formKey, model[key]);
      } else {
        formData.append(formKey, model[key].toString());
      }
    });
  }

  return formData;
};

export const convertObjectToArray = <T>(modelPropierties: string[], model: Generic) => (
  modelPropierties.reduce((previous: T[], current: string) => (
    (current in model)
      ? [ ...previous, model[current] ]
      : previous), [])
);

  interface UIRoles {
    name: string,
    code: AllowedRoles
  }

export const roles: UIRoles[] = [
  { name: 'Lector', code: 'reader' },
  { name: 'Administrador', code: 'admin' },
  { name: 'Profesor', code: 'professor' },
  { name: 'Mentor', code: 'mentor' },
  { name: 'Estudiante', code: 'student' },
];

export const convertRoles = (allowedRoles: AllowedRoles[]): UIRoles[] => {
  const uiRoles = allowedRoles.reduce((
    acc: UIRoles[],
    allowedRole: AllowedRoles,
  ) => {
    const newRoles = roles.find((role) => role.code === allowedRole);
    if (newRoles) {
      acc.push(newRoles);
    }
    return acc;
  }, []);

  return uiRoles;
};

export default {
  convertAdditionalSubjects,
  convertModelToFormData,
  convertObjectToArray,
  convertRoles,
  roles,
};
