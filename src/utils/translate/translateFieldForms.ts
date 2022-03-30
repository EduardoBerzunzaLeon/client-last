export interface TranslateAuthFields {
    email: string,
    password: string,
    gender: string,
    first: string,
    last: string,
    name: string
}

export const translateAuthFields: TranslateAuthFields = {
  email: 'email',
  password: 'contraseña',
  gender: 'genero',
  first: 'nombre',
  last: 'apellido',
  name: 'nombre completo',
};

export default {
  translateAuthFields,
};
