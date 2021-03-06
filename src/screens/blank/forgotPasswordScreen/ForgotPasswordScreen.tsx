import { Button } from 'primereact/button';
import { Card } from 'primereact/card';
import { Form, Formik } from 'formik';
import { Link } from 'react-router-dom';
import { Toast } from 'primereact/toast';
import * as Yup from 'yup';

import { ForgotPasswordRequest } from '../../../interfaces';
import { InputTextApp } from '../../../components/forms';
import { RESET_PASSWORD_URL } from '../../../config/enviroment';
import { setAuthFormErrors, processError } from '../../../utils';

import { useForgotPasswordMutation } from '../../../redux/auth/auth.api';
import { useToast } from '../../../hooks';

export const ForgotPasswordScreen = () => {
  const { toast, showError, showSuccess } = useToast();
  const [ sendEmailForgotPassword, { isLoading, isSuccess }] = useForgotPasswordMutation();

  return (
    <Card
      title="¡Restablecer contraseña!"
    >
      <Toast ref={toast} />
      {
        (isSuccess) ? (
          <p className="text-justify">
            Si encontramos una cuenta asociada con ese
            nombre de usuario, enviamos instrucciones para
            restablecer la contraseña a la dirección de correo
            electrónico principal de la cuenta.
          </p>
        ) : (
          <Formik
            initialValues={{ email: '' }}
            onSubmit={async (values, { setFieldError }) => {
              try {
                const sendData: ForgotPasswordRequest = {
                  url: RESET_PASSWORD_URL,
                  ...values,
                };
                const { message } = await sendEmailForgotPassword(sendData).unwrap();
                showSuccess({ detail: message });
              } catch (error) {
                const errors: string = processError({ error, showError });
                setAuthFormErrors({ errors, setFieldError });
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
                    label="Enviar correo de cambio de contraseña"
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
          Ya recorde mi clave
        </Link>
      </div>
    </Card>
  );
};

export default ForgotPasswordScreen;
