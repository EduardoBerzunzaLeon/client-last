export type PhaseStatus = 'cursando' | 'reprobado' | 'aprobado';

export interface CreateSubjectHistory {
  userId: string,
  subjectId: string,
  phaseStatus: PhaseStatus,
  semester: number,
  mode: string,
}

export interface UpdateSubjectHistory {
  phaseId: string,
  phaseStatus: PhaseStatus,
  semester: number,
  mode: string,
  date?: Date
}
