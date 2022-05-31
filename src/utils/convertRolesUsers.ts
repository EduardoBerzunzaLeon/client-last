import { AllowedRoles } from '../interfaces/api';

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
  roles,
  convertRoles,
};
