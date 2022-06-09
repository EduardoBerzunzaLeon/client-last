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
    enrollment: string,
    currentSemester: number,
    userId: string,
    avatar: string,
    name: {
        first: string,
        last: string,
    },
    gender: 'M' | 'F',
    professor: StudentProfessor
}
