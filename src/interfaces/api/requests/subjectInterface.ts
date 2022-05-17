export interface UpdateSubjectRequest {
    id: string,
    credit?: number,
    deprecated?: boolean,
    name?: string,
    semester?: number,
    practicalHours?: number,
    theoreticalHours?: number,
    core: string,
    requiredSubjects?: string[] | [],
}

export interface CreateSubjectRequest {
    credit: number,
    deprecated: boolean,
    name: string,
    semester: number,
    practicalHours: number,
    theoreticalHours: number,
    core: string,
    requiredSubjects?: string[] | [],
}
