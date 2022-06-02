export interface UpdateCourseRequest {
    id: string,
    impartedAt: Date,
    name: string,
    user: string
}

export type CreateCourseRequest = Omit<UpdateCourseRequest, 'id'>;
