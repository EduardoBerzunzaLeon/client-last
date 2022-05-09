export interface Subject {
    id: string,
    credit: number
    createAt: Date,
    depreacted: boolean,
    name: string,
    semester: number,
    consecutiveSubject?: string,
    depreactedAt?: Date,
}
