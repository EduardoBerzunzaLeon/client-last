const ROLES_LIST = {
  Admin: 'admin',
  Professor: 'professor',
  Reader: 'reader',
  Student: 'student',
  Mentor: 'mentor',
};

const {
  Admin, Professor, Reader,
} = ROLES_LIST;

const USER_PERMISSIONS = {
  canView: [ Admin, Reader ],
  canDelete: [ Admin ],
  canUpdate: [ Admin ],
  canCreate: [ Admin ],
};

const PROFESSOR_PERMISSIONS = {
  canView: [ Admin, Reader ],
  canDelete: [ Admin ],
  canUpdate: [ Admin ],
  canCreate: [ Admin ],
};

const SUBJECT_PERMISSIONS = {
  canView: [ Admin, Reader, Professor ],
  canDelete: [ Admin ],
  canUpdate: [ Admin ],
  canCreate: [ Admin ],
};

const COURSE_PERMISSIONS = {
  canView: [ Admin, Reader, Professor ],
  canDelete: [ Admin, Professor ],
  canUpdate: [ Admin, Professor ],
  canCreate: [ Admin, Professor ],
};

export type Modules = 'user' | 'professor' | 'subject' | 'course';

const PERMISSIONS_LIST = {
  user: USER_PERMISSIONS,
  professor: PROFESSOR_PERMISSIONS,
  subject: SUBJECT_PERMISSIONS,
  course: COURSE_PERMISSIONS,
};

export default PERMISSIONS_LIST;
