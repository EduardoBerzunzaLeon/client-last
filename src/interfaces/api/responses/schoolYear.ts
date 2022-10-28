import { Name } from '../requests/authRequest';

export interface UserSchoolYear {
    _id: string,
    name: Name,
    email: string,
}

export interface Period {
    start: number;
    end: number;
}

export interface SchoolYearSimplify {
    period: Period;
    phase: number;
}

export interface SchoolYearErrors {
    id: string;
    schoolYear: SchoolYearSimplify;
    enrollment: string;
    subject: string;
    createdAt: string;
    error: string;
}

export interface BeforeSchoolYear {
    _id: string;
    period: Period;
}

export interface PhaseSchoolYear {
    createdAt: string;
    user?: UserSchoolYear;
    status: string;
}

export interface SchoolYear {
    id: string;
    firstPhase: PhaseSchoolYear;
    secondPhase: PhaseSchoolYear;
    isCurrent: boolean;
    beforeSchoolYear: BeforeSchoolYear;
    createdAt: string;
    updatedAt: string;
    period: Period;
}
