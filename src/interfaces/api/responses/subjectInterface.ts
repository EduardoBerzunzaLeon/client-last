export interface SubjectUnion {
    _id: string,
    name: string,
    deprecated: boolean,
}

export interface Subject {
    id: string,
    core: string,
    createAt: Date,
    credit: number
    deprecated: boolean,
    name: string,
    practicalHours: number,
    semester: number,
    theoreticalHours: number,
    totalHours: number,
    deprecatedAt?: Date,
    requiredSubjects?: string,
}

export interface RequiredSubjects {
    id: string,
    name: string,
}

export interface SubjectDetail {
    id: string,
    core: string,
    createAt: Date,
    credit: number,
    deprecated: boolean,
    name: string,
    practicalHours: number,
    semester: number,
    theoreticalHours: number,
    totalHours?: number,
    correlativeSubjects?: [SubjectUnion],
    deprecatedAt?: Date,
    requiredSubjects?: [SubjectUnion],
}
