interface ProfessorsHistory {
    createdAt: string;
    comments: string;
    _id: string;
    professor: string;
}

interface StatusHistory {
    createdAt: string;
    _id: string;
    status: string;
}

interface LastPhase {
    date: string;
    _id: string;
    phaseStatus: string;
    semester: number;
}

interface Subject {
    _id: string;
    deprecated: boolean;
    name: string;
}

interface SubjectHistory {
    _id: string;
    subject: Subject;
    lastPhase: LastPhase;
    step: number;
}

interface Name {
    first: string;
    last: string;
}

interface User {
    _id: string;
    avatar: string;
    name: Name;
    email: string;
    gender: string;
}

export interface SubjectHistoryDetail {
    _id: string;
    classroom: string;
    atRisk: string;
    inChannelling: string;
    user: User;
    professorsHistory: ProfessorsHistory[];
    enrollment: string;
    currentSemester: number;
    statusHistory: StatusHistory[];
    subjectHistory: SubjectHistory[];
}
