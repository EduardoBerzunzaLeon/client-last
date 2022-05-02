export interface AuthFieldsTranslation {
    email: string,
    password: string,
    gender: string,
    first: string,
    last: string,
    name: string
}

export const authFieldsTranslation: AuthFieldsTranslation = {
  email: 'email',
  password: 'contraseña',
  gender: 'genero',
  first: 'nombre',
  last: 'apellido',
  name: 'nombre completo',
};

export default {
  authFieldsTranslation,
};
