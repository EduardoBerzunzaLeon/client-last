import { Link } from 'react-router-dom';

import { Button } from 'primereact/button';
import { Card } from 'primereact/card';
import { Form, Formik } from 'formik';
import * as Yup from 'yup';

import { genderRadio } from '../../../utils/form/radioButtonsObjects';
import { InputTextApp, RadioGroup, withDetailInputPassword } from '../../../components/forms';

const InputPassword = withDetailInputPassword(InputTextApp);

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
      {({ isValid, isSubmitting, dirty }) => (
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
            <InputPassword
              label="Contraseña"
              name="password"
              className="w-full"
            />
          </div>

          <div className="field pt-2">
            <InputPassword
              label="Contraseña"
              name="confirmPassword"
              className="w-full"
            />
          </div>

          <RadioGroup radios={genderRadio} />

          <div className="flex flex-column">
            <Button type="submit" label="Crear una cuenta" className="mt-2 flex align-items-center justify-content-center" disabled={!isValid || isSubmitting || !dirty} />
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
