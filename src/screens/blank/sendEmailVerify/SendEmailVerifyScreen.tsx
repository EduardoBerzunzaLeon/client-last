import { useEffect } from 'react';

import { Form, Formik } from 'formik';
import { Link, useLocation } from 'react-router-dom';
import * as Yup from 'yup';

import { Button } from 'primereact/button';
import { Card } from 'primereact/card';
import { Toast } from 'primereact/toast';
import { InputTextApp } from '../../../components/forms';
import { useSendEmailVerifyMutation } from '../../../redux/auth/auth.api';
import useToast from '../../../hooks/useToast';

interface LocationProps {
    state: { email?: string } | null
}

const SendEmailVerifyScreen = () => {
  const { state } = useLocation() as LocationProps;
  const [ sendMail, {
    isLoading, isError, isSuccess,
  }] = useSendEmailVerifyMutation();
  const url: string = process.env.REACT_APP_RESET_PASSWORD_URL ?? '';

  const { toast, showError, showSuccess } = useToast();

  useEffect(() => {
    if (isError) {
      showError({
        summary: 'Error',
        detail: 'No se pudo enviar el correo, favor se cambiar el correo electronico o volverlo a intentar',
      });
    }

    if (isSuccess) {
      showSuccess({
        summary: 'Éxito',
        detail: 'Cuenta verificada con éxito',
      });
    }
  }, [ isError, isSuccess ]);

  useEffect(() => {
    if (state?.email) {
      sendMail({
        email: state.email,
        url,
      });
    }
  }, [ sendMail, state ]);

  return (
    <Card
      title="¡Reenviar correo de verificación!"
    >
      <Toast ref={toast} />
      {
        (isSuccess) ? (
          <p className="text-justify">
            Si encontramos una cuenta asociada con ese
            nombre de usuario, enviamos instrucciones para
            activar la dirección de correo
            electrónico principal de la cuenta.
          </p>
        ) : (
          <Formik
            initialValues={{ email: state?.email ?? '' }}
            onSubmit={async (values) => {
              try {
                await sendMail({ ...values, url }).unwrap();
              } catch (error) {
                showError({
                  summary: 'Error',
                  detail: 'No se pudo enviar el correo, favor se cambiar el correo electronico o volverlo a intentar',
                });
              }
            }}
            validationSchema={Yup.object({
              email: Yup.string()
                .email('Email no tiene un formato valido')
                .required('Requerido'),
            })}
          >

            {({ isValid, isSubmitting, dirty }) => (
              <Form>
                <div className="field pt-2">
                  <InputTextApp
                    label="Email"
                    name="email"
                    id="email"
                    keyfilter="email"
                    className="w-full"
                    icon="pi pi-envelope"
                    autoFocus
                  />
                </div>
                <div className="flex flex-column">
                  <Button
                    type="submit"
                    loading={isLoading}
                    label="Reenviar correo de verificación de cuenta"
                    className="mt-2 flex align-items-center justify-content-center"
                    disabled={!isValid || isSubmitting || !dirty}
                  />
                </div>
              </Form>
            )}
          </Formik>
        )
      }

      <div className="flex justify-content-end mt-1">
        <Link to="/login">
          Ir a inicio de sesión
        </Link>
      </div>
    </Card>
  );
};

export default SendEmailVerifyScreen;
