export interface ProfessorInHistoryFieldsTranslation {
    professorsHistory: string,
    comments: string,
    createdAt: string,
    dischargeAt: string,
    idProfessorBefore: string,
}

export const professorInHistoryFieldsTranslation: ProfessorInHistoryFieldsTranslation = {
  professorsHistory: 'Historial de tutores',
  createdAt: 'Creado el',
  dischargeAt: 'Dado de baja en',
  comments: 'Comentarios de baja',
  idProfessorBefore: 'Profesor Anterior',
};

export default {
  professorInHistoryFieldsTranslation,
};
