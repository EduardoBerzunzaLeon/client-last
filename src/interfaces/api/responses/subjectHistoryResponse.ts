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
    mode: string;
}

interface Subject {
    _id: string;
    deprecated: boolean;
    name: string;
}

export interface SubjectHistory {
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
    fullName: string;
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

export interface GeneralSubject {
    _id: string;
    practicalHours: number;
    theoreticalHours: number;
    name: string;
    semester: number;
    credit: number;
    core: string;
}

// export interface SubjectInHistory {
//     id: string;
//     student: string;
//     subject: string;
//     phase: {
//         id: string;
//         date: string;
//         phaseStatus: string;
//         semester: number;
//     }[];
// }

export interface DataNode {
    subject: string;
    status: string;
    step: string;
    mode: string;
}

export interface SubjectsStudied {
    key: string;
    data: DataNode;
    children?: SubjectsStudied[];
}
