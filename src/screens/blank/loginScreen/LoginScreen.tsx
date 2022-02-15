import { Button } from 'primereact/button';
import { Card } from 'primereact/card';
import { Divider } from 'primereact/divider';
import { Formik, Form } from 'formik';
import { Link } from 'react-router-dom';
import { Toast } from 'primereact/toast';
import * as Yup from 'yup';

import { InputTextApp } from '../../../components/forms';

import { getDetailError } from '../../../redux/services/handlerErrorApi';
import { setCredentials } from '../../../redux/auth/auth.slice';
import { useAppDispatch } from '../../../redux/hooks';
import { useLoginMutation } from '../../../redux/services/tutorApi';
import useToast from '../../../hooks/useToast';

import './loginScreen.scss';

const LoginScreen = () => {
  const dispatch = useAppDispatch();
  const [ login, { isLoading }] = useLoginMutation();
  const { toast, showError } = useToast();

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
        onSubmit={async (values) => {
          try {
            const user = await login(values).unwrap();
            dispatch(setCredentials(user));
          } catch (error) {
            showError({
              summary: 'Error',
              detail: getDetailError(error),
            });
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
              <Button
                type="submit"
                label="Iniciar Sesión"
                className="mt-2 flex align-items-center justify-content-center"
                loading={isLoading}
                disabled={!isValid || isSubmitting || !dirty}
              />
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
