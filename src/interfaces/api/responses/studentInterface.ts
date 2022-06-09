interface StudentStatus {
    _id: string,
    createdAt: Date,
    status: 'regular' | 'baja' | 'baja temporal' | 'egresado',
}

interface StudentProfessor {
    _id: string,
    name: {
        first: string,
        last: string,
    }
}

export interface StudentResume {
    id: string,
    atRisk: 'no' | 'ultimo intento' | 'unica materia' | 'no termina',
    status: StudentStatus,
    enrollment: string,
    currentSemester: number,
    userId: string,
    name: {
        first: string,
        last: string,
    },
    gender: 'M' | 'F',
    professor: StudentProfessor
}
