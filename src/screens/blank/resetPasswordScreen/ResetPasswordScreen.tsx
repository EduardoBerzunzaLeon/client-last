import { Button } from 'primereact/button';
import { Card } from 'primereact/card';
import { Form, Formik } from 'formik';
import { Toast } from 'primereact/toast';
import { useParams, useNavigate } from 'react-router-dom';
import * as Yup from 'yup';

import { InputTextApp, withDetailInputPassword } from '../../../components/forms';
import { ResetPasswordRequest } from '../../../interfaces/api';
import { setAuthFormErrors, processError } from '../../../utils/forms/handlerFormErrors';
import { useResetPasswordMutation } from '../../../redux/auth/auth.api';
import { useToast } from '../../../hooks/useToast';

const InputPassword = withDetailInputPassword(InputTextApp);

export const ResetPasswordScreen = () => {
  const { token } = useParams();

  const navigate = useNavigate();
  const [ resetPassword, { isLoading }] = useResetPasswordMutation();
  const { toast, showError } = useToast();

  return (
    <Card
      title="¡Restablecer contraseña!"
    >
      <Toast ref={toast} />
      <Formik
        initialValues={{
          password: '',
          confirmPassword: '',
        }}
        onSubmit={async (values, { setFieldError }) => {
          const sanatizeToken = token ?? '';
          const prepareSend: ResetPasswordRequest = { ...values, token: sanatizeToken };
          try {
            await resetPassword({ ...prepareSend }).unwrap();
          } catch (error) {
            const errors: string = processError({ error, showError });
            setAuthFormErrors({ errors, setFieldError });

            setTimeout(() => {
              navigate('/login');
            }, 1500);
          }
        }}
        validationSchema={Yup.object({
          password: Yup.string()
            .min(6, 'Mínimo 6 letras')
            .required('Requerido'),
          confirmPassword: Yup.string()
            .oneOf([ Yup.ref('password') ], 'Las contraseñas tienen que ser iguales')
            .required('Requerido'),
        })}
      >
        {({ isValid, isSubmitting, dirty }) => (
          <Form>
            <div className="field pt-2">
              <InputPassword
                label="Contraseña"
                id="password"
                name="password"
                className="w-full"
              />
            </div>

            <div className="field pt-2">
              <InputPassword
                label="Confirmar Contraseña"
                name="confirmPassword"
                id="confirmPassword"
                className="w-full"
              />
            </div>

            <div className="flex flex-column">
              <Button
                type="submit"
                label="Cambiar contraseña"
                className="mt-2 flex align-items-center justify-content-center"
                disabled={!isValid || isSubmitting || !dirty}
                loading={isLoading}
              />
            </div>
          </Form>
        )}
      </Formik>
    </Card>
  );
};

export default ResetPasswordScreen;
