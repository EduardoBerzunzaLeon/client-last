export interface UpdateCourseRequest {
    id: string,
    impartedAt: Date,
    name: string,
    professor: string
}

export type CreateCourseRequest = Omit<UpdateCourseRequest, 'id'>;
