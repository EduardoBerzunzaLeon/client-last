export interface CourseProfessor {
    id: string,
    impartedAt: Date,
    name: string,
    professor: string
}

export interface SubjectProfessor {
  _id: string,
  deprecated: boolean,
  name: string,
  semester: number
}

export interface Professor {
    id: string,
    email: string,
    name: {
      first: string,
      last: string,
    },
    fullname: string,
    gender: string,
    avatar?: string,
    active: boolean,
    createdAt: Date,
    subjects: string[] | [],
    courses: string[] | [],
}

export interface ProfessorDetail {
    id: string,
    email: string,
    name: {
      first: string,
      last: string,
    },
    fullname: string,
    gender: string,
    avatar?: string,
    active: boolean,
    createdAt: Date,
    subjects: [SubjectProfessor] | [],
    courses: [CourseProfessor] | [],
}

export interface ProfessorsDataToExcel {
  id: string,
  name: string,
  email: number,
  gender: string,
  active: string,
  createdAt: Date,
  subjects: string,
  courses: string,
}
