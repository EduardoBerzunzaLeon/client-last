export type PhaseStatus = 'cursando' | 'reprobado' | 'aprobado';

export interface CreateSubjectHistory {
  userId: string,
  subjectId: string,
  phaseStatus: PhaseStatus,
  semester: number
}

export interface AddSubjectHistory {
  id: string,
  phaseStatus: PhaseStatus,
  semester: number,
  date?: Date
}

export interface UpdateSubjectHistory {
  phaseId: string,
  phaseStatus: PhaseStatus,
  semester: number,
  date?: Date
}
