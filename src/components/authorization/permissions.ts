import { AllowedRoles } from '../../interfaces';

export type ModulesName = 'user' | 'professor' | 'subject' | 'course' | 'student' | 'subjectHistory' | 'academicCareer';
export type PermissionsName = 'canView' | 'canDelete' | 'canUpdate' | 'canCreate';

interface Roles {
  [x: string]: AllowedRoles;
}

const ROLES_LIST: Roles = {
  Admin: 'admin',
  Professor: 'professor',
  Reader: 'reader',
  Student: 'student',
  Mentor: 'mentor',
};

const {
  Admin, Professor, Reader,
} = ROLES_LIST;

const USER_PERMISSIONS: Record<PermissionsName, AllowedRoles[]> = {
  canView: [ Admin, Reader ],
  canDelete: [ Admin ],
  canUpdate: [ Admin ],
  canCreate: [ Admin ],
};

const PROFESSOR_PERMISSIONS: Record<PermissionsName, AllowedRoles[]> = {
  canView: [ Admin, Reader ],
  canDelete: [ Admin ],
  canUpdate: [ Admin ],
  canCreate: [ Admin ],
};

const SUBJECT_PERMISSIONS: Record<PermissionsName, AllowedRoles[]> = {
  canView: [ Admin, Reader, Professor ],
  canDelete: [ Admin ],
  canUpdate: [ Admin ],
  canCreate: [ Admin ],
};

const COURSE_PERMISSIONS: Record<PermissionsName, AllowedRoles[]> = {
  canView: [ Admin, Reader, Professor ],
  canDelete: [ Admin, Professor ],
  canUpdate: [ Admin, Professor ],
  canCreate: [ Admin, Professor ],
};

const STUDENT_PERMISSIONS: Record<PermissionsName, AllowedRoles[]> = {
  canView: [ Admin, Reader, Professor ],
  canDelete: [ Admin, Professor ],
  canUpdate: [ Admin, Professor ],
  canCreate: [ Admin, Professor ],
};

const SUBJECT_HISTORY_PERMISSIONS: Record<PermissionsName, AllowedRoles[]> = {
  canView: [ Admin, Reader, Professor ],
  canDelete: [ Admin, Professor ],
  canUpdate: [ Admin, Professor ],
  canCreate: [ Admin, Professor ],
};

const ACADEMIC_CAREER_PERMISSIONS: Record<PermissionsName, AllowedRoles[]> = {
  canView: [ Admin, Reader, Professor ],
  canDelete: [ Admin, Professor ],
  canUpdate: [ Admin, Professor ],
  canCreate: [ Admin, Professor ],
};

const PERMISSIONS_LIST: Record<ModulesName, Record<PermissionsName, AllowedRoles[]>> = {
  user: USER_PERMISSIONS,
  professor: PROFESSOR_PERMISSIONS,
  subject: SUBJECT_PERMISSIONS,
  course: COURSE_PERMISSIONS,
  student: STUDENT_PERMISSIONS,
  subjectHistory: SUBJECT_HISTORY_PERMISSIONS,
  academicCareer: ACADEMIC_CAREER_PERMISSIONS,
};

export default PERMISSIONS_LIST;
