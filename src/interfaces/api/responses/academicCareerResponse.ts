export type PhaseStatusAcademicCareer =
    'aprobado' |
    'Por cursar' |
    'reprobado' |
    'cursando';

export type AtRiskCareer = '' | 'Unica Materia' | 'Ultimo intento';

export interface AdjustedSubjectData {
    _id: number;
    name: string;
    phase: string;
}

export interface Phase {
    date?: string;
    _id?: string;
    phaseStatus: PhaseStatusAcademicCareer;
    semester: number;
}

export interface ChildData {
    _id: string;
    name: string;
    phase: Phase[];
    atRisk: AtRiskCareer;
}

export interface Child {
    key: string;
    data: ChildData;
}

export interface AdjustedSubject {
    key: number;
    data: AdjustedSubjectData;
    children: Child[];
}

export interface AcademicCareerTreeData {
    adjustedSubjects: AdjustedSubject[];
    unaddedSubjects: [];
}
