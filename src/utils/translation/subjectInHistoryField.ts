export interface SubjectInHistoryFieldsTranslation {
    student: string,
    subject: string,
    createdAt: string,
    phase: string,
    phaseStatus: string,
    date: string,
    semester: string
}

export const subjectInHistoryFieldsTranslation: SubjectInHistoryFieldsTranslation = {
  student: 'estudiante',
  subject: 'materia',
  createdAt: 'creado el',
  phase: 'fase',
  phaseStatus: 'Estatus de la fase',
  date: 'fecha',
  semester: 'semestre',
};

export default {
  subjectInHistoryFieldsTranslation,
};
