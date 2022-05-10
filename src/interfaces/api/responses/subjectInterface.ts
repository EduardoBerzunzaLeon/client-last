interface SubjectUnion {
    _id: string,
    name: string,
    deprecated: boolean,
}

export interface Subject {
    id: string,
    credit: number
    createAt: Date,
    deprecated: boolean,
    name: string,
    semester: number,
    consecutiveSubject?: string,
    deprecatedAt?: Date,
}

export interface SubjectDetail {
    id: string,
    credit: number
    createAt: Date,
    deprecated: boolean,
    name: string,
    semester: number,
    consecutiveSubject?: SubjectUnion,
    previousSubject?: SubjectUnion,
    deprecatedAt?: Date,
}
