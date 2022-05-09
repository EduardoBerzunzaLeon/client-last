export interface UpdateSubjectRequest {
    id: string,
    credit?: number
    depreacted?: boolean,
    name?: string,
    semester?: number,
    consecutiveSubject?: string,
}

export type CreateSubjectRequest = Omit<UpdateSubjectRequest, 'id'>;
