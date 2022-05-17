export interface SubjectFieldsTranslation {
    core: string,
    createAt: string,
    deprecated: string,
    name: string,
    practicalHours: string,
    semester: string,
    theoricalHours: string,
    totalHours: string,
    correlativeSubjets: string,
    deprecatedAt: string,
    requiredSubjects: string,
}

export const subjectFieldsTranslation: SubjectFieldsTranslation = {
  core: 'núcleo',
  createAt: 'creado el',
  deprecated: 'deprecado',
  name: 'nombre',
  practicalHours: 'horas prácticas',
  semester: 'semestre',
  theoricalHours: 'horas teóricas',
  totalHours: 'horas totales',
  correlativeSubjets: 'materias correlativas',
  deprecatedAt: 'deprecado el',
  requiredSubjects: 'materias requeridas',
};

export default {
  subjectFieldsTranslation,
};
