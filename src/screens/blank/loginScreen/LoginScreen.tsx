import { Link } from 'react-router-dom';

import { Button } from 'primereact/button';
import { Card } from 'primereact/card';
import { Divider } from 'primereact/divider';
import { Formik, Form } from 'formik';
import * as Yup from 'yup';

import './loginScreen.scss';
import { InputTextApp } from '../../../components/forms';

const LoginScreen = () => (
  <Card
    title="¡Bienvenido!"
    subTitle="Inicio de Sesión"
  >
    <Formik
      initialValues={{
        email: '',
        password: '',
      }}
      onSubmit={(values) => {
        console.log(values);
      }}
      validationSchema={Yup.object({
        email: Yup.string()
          .email('Email no tiene un formato valido')
          .required('Requerido'),
        password: Yup.string()
          .required('Requerido'),
      })}
    >
      {({ isValid, isSubmitting, dirty }) => (
        <Form>
          <div className="field pt-2">
            <InputTextApp
              label="Email"
              name="email"
              keyfilter="email"
              className="w-full"
              icon="pi pi-envelope"
              autoFocus
            />
          </div>

          <div className="flex justify-content-end">
            <Link to="/forgot-password">
              ¿Olvidaste la contraseña?
            </Link>
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

          <div className="flex flex-column">
            <Button type="submit" label="Iniciar Sesión" className="mt-2 flex align-items-center justify-content-center" disabled={!isValid || isSubmitting || !dirty} />
          </div>

          <div className="flex justify-content-end mt-1">
            <Link to="/register">
              No tengo cuenta
            </Link>
          </div>

        </Form>
      )}
    </Formik>

    <Divider align="center">
      <span className="p-card-subtitle">Ingresar por red social</span>
    </Divider>

    <div className="grid">
      <div className="col-12 lg:col-6">
        <Button type="submit" label="Google" className="mt-2 w-full" />
      </div>
      <div className="col-12 lg:col-6">
        <Button type="submit" label="Facebook" className="mt-2 w-full" />
      </div>
    </div>

  </Card>
);

export default LoginScreen;
