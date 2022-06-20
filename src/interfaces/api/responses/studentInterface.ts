export interface StudentStatus {
    _id: string,
    createdAt: Date,
    status: 'regular' | 'baja' | 'baja temporal' | 'egresado',
}

export interface StudentProfessor {
    id: string,
    name: {
        first: string,
        last: string,
    },
    avatar: string
}

export interface StudentResume {
    id: string,
    atRisk: 'no' | 'ultimo intento' | 'unica materia' | 'no termina',
    status: StudentStatus,
    email: string,
    enrollment: string,
    currentSemester: number,
    studentId: string,
    avatar: string,
    classroom: string,
    active: boolean,
    name: {
        first: string,
        last: string,
    },
    gender: 'M' | 'F',
    professor: StudentProfessor
}

export interface ProfessorInHistory {
    createdAt: Date,
    id: string,
    professor: StudentProfessor,
    comments: string,
    dischargeAt?: Date,
    idProfessorBefore?: string
}

export interface StudentProfessorInHistory {
    id: string,
    professorsHistory: ProfessorInHistory[],
}
