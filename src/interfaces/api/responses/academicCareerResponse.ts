import { GeneralSubject } from './subjectHistoryResponse';

export type PhaseStatusAcademicCareer =
    'aprobado' |
    'Por cursar' |
    'reprobado' |
    'cursando';

export type AtRiskCareer = '' | 'Unica Materia' | 'Ultimo intento';

export interface AdjustedSubjectData {
    _id: number,
    name: string,
    phase: string,
}

export interface Phase {
    date?: string,
    _id?: string,
    phaseStatus: PhaseStatusAcademicCareer,
    semester: number,
}

export interface ChildData {
    _id: string,
    name: string,
    phase: Phase[],
    atRisk: AtRiskCareer,
}

export interface Child {
    key: string,
    data: ChildData,
}

export interface AdjustedSubject {
    key: number,
    data: AdjustedSubjectData,
    children: Child[],
}

interface Name {
    first: string,
    last: string,
}

export interface GenerationParams {
    subjectsInSemester: number,
    canAdvanceSubject: boolean,
    hasValidation: boolean,
}

export interface CreatorUser {
    name: Name,
    avatar: string,
    createdAt: Date,
}

export interface SchoolYearAcademic {
    id: {
        _id: string,
        period: {
            start: number,
            end: number,
        }
    },
    phase: number
}

export interface AcademicCareer {
    _id: string,
    createdAt: string,
    generationParams: GenerationParams,
    creatorUser: CreatorUser,
    schoolYear: SchoolYearAcademic,
    processStatus: string,
    subjects: AdjustedSubject[],
}

export interface AcademicCareerComplete {
    _id: string,
    name: Name,
    email: string,
    gender: string,
    avatar: string,
    currentSemester: number,
    enrollment: string,
    academicCareer?: AcademicCareer,
    unaddedSubjects: GeneralSubject[]
}

export interface AcademicCareerExcel {
    subject: string,
    atRisk: string,
    semester: string,
    firstPhase: string,
    secondPhase: string,
    thirsPhase: string,
}
