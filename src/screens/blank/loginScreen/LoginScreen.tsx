import {
  useEffect, useRef, useState,
} from 'react';

import { Button } from 'primereact/button';
import { Card } from 'primereact/card';
import { Divider } from 'primereact/divider';
import { Formik, Form } from 'formik';
import { Link, useNavigate } from 'react-router-dom';
import { Toast } from 'primereact/toast';
import * as Yup from 'yup';

import { FacebookButton } from '../../../components/facebookButton/FacebookButton';
import { getDetailError } from '../../../redux/services/handlerErrorApi';
import { GoogleButton } from '../../../components/googleButton/GoogleButton';
import { InputTextApp } from '../../../components/forms';
import { useLoginMutation } from '../../../redux/auth/auth.api';
import useToast from '../../../hooks/useToast';

import './loginScreen.scss';

const LoginScreen = () => {
  const navigate = useNavigate();
  const [ login, { isLoading }] = useLoginMutation();
  const { toast, showError } = useToast();
  const isMounted = useRef<any>(null);
  const [ showGoogle, setShowGoogle ] = useState(false);

  // ! DELETE: In production with https: this useEffect is unnecessary
  useEffect(() => {
    isMounted.current = true;

    if (isMounted.current) {
      setShowGoogle(true);
    }

    return () => {
      isMounted.current = false;
    };
  }, []);

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
            await login({ ...values }).unwrap();
          } catch (error) {
            const detail: string = getDetailError(error);
            showError({
              summary: 'Error',
              detail,
            });

            if (detail === 'El correo aun no ha sido activado') {
              setTimeout(() => {
                navigate('/send-email-verify', { state: { email: values.email }});
              }, 3000);
            }
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
        <div className="col-12 md:col-6">
          {
            showGoogle && <GoogleButton />
          }
        </div>
        <div className="col-12 md:col-6">
          <FacebookButton />
        </div>
      </div>

    </Card>
  );
};

export default LoginScreen;
