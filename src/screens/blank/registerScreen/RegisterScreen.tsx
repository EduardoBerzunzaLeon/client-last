import { Link } from 'react-router-dom';

import { Form, Formik } from 'formik';
import { Button } from 'primereact/button';
import { Card } from 'primereact/card';
import * as Yup from 'yup';

import InputTextApp from '../../../components/forms/InputTextApp';

const RegisterScreen = () => (
  <Card
    title="¡Registrarme!"
    subTitle="Crear una cuenta"
  >
    <Formik
      initialValues={{
        first: '',
        last: '',
        email: '',
        password: '',
        confirmPassword: '',
        gender: '',
      }}
      onSubmit={(values) => {
        console.log(values);
      }}
      validationSchema={Yup.object({
        first: Yup.string()
          .required('Requerido'),
        last: Yup.string()
          .required('Requerido'),
        email: Yup.string()
          .email('Email no tiene un formato valido')
          .required('Requerido'),
        password: Yup.string()
          .min(6, 'Mínimo 6 letras')
          .required('Requerido'),
        confirmPassword: Yup.string()
          .oneOf([ Yup.ref('password') ], 'Las contraseñas tienen que ser iguales')
          .required('Requerido'),
        gender: Yup.string()
          .required('Requerido'),
      })}
    >
      {({ isValid, isSubmitting }) => (
        <Form>

          <div className="field pt-2">
            <InputTextApp
              label="Nombre*"
              name="first"
              className="w-full"
              icon="pi pi-user"
              autoFocus
            />
          </div>

          <div className="field pt-2">
            <InputTextApp
              label="Apellido(s)*"
              name="last"
              className="w-full"
              icon="pi pi-user-edit"
            />
          </div>

          <div className="field pt-2">
            <InputTextApp
              label="Email"
              name="email"
              keyfilter="email"
              className="w-full"
              icon="pi pi-envelope"
            />
          </div>

          <div className="field pt-2">
            <InputTextApp
              label="Contraseña"
              name="password"
              type="password"
              className="w-full"
              toggleMask
              feedback={false}
            />
          </div>

          <div className="field pt-2">
            <InputTextApp
              label="Contraseña"
              name="confirmPassword"
              type="password"
              className="w-full"
              toggleMask
              feedback={false}
            />
          </div>

          <div className="flex flex-column">
            <Button type="submit" label="Enviar" className="mt-2 flex align-items-center justify-content-center" disabled={!isValid || isSubmitting} />
          </div>
          <div className="flex justify-content-end mt-1">
            <Link to="/login">
              Ya tengo una cuenta
            </Link>
          </div>
        </Form>
      )}
    </Formik>

  </Card>
);

export default RegisterScreen;
