export interface ProfessorFieldsTranslation {
    email: string,
    password: string,
    gender: string,
    first: string,
    last: string,
    name: string,
    active: string,
    subjects: string,
    courses: string,
}

export const professorFieldsTranslation: ProfessorFieldsTranslation = {
  email: 'email',
  password: 'contraseña',
  gender: 'genero',
  first: 'nombre',
  last: 'apellido',
  name: 'nombre completo',
  active: 'activo',
  subjects: 'materias',
  courses: 'cursos',
};

export default {
  professorFieldsTranslation,
};
