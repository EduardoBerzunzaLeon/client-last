import { useRef } from 'react';

import { Button } from 'primereact/button';
import { Card } from 'primereact/card';
import { Divider } from 'primereact/divider';
import { Formik, Form } from 'formik';
import { Link } from 'react-router-dom';
import { Toast } from 'primereact/toast';
import * as Yup from 'yup';

import { InputTextApp } from '../../../components/forms';
import { setCredentials } from '../../../redux/auth/auth.slice';
import { useAppDispatch } from '../../../redux/hooks';
import { ErrorResponse, useLoginMutation } from '../../../redux/services/tutor';

import 'primeicons/primeicons.css';
// import 'primereact/resources/themes/lara-light-indigo/theme.css';
// import 'primereact/resources/primereact.css';
// import 'primeflex/primeflex.css';
import './loginScreen.scss';

const isErrorResponseApiType = (error: any): error is ErrorResponse => ('data' in error && 'error' in error.data);

const LoginScreen = () => {
  const dispatch = useAppDispatch();
  const [ login ] = useLoginMutation();

  const toast = useRef<any>(null);

  const showError = (message: string) => {
    toast.current.show({
      severity: 'error', summary: 'Error', detail: message, life: 3000,
    });
  };

  return (
    <Card
      title="¡Bienvenido!"
      subTitle="Inicio de Sesión"
    >

      <Toast ref={toast} />
      <Formik
        initialValues={{
          email: '',
          password: '',
        }}
        onSubmit={async (values, { setSubmitting }) => {
          try {
            const user = await login(values).unwrap();
            dispatch(setCredentials(user));
          } catch (err) {
            isErrorResponseApiType(err) && showError(err.data.error.message);
          } finally {
            setSubmitting(false);
          }
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
};

export default LoginScreen;
