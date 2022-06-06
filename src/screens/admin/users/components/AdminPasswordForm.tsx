import { Button } from 'primereact/button';
import { Form, Formik } from 'formik';
import { Toast } from 'primereact/toast';
import * as Yup from 'yup';

import { InputTextApp, withDetailInputPassword } from '../../../../components/forms';
import { processError } from '../../../../utils/forms/handlerFormErrors';
import { UpdatePasswordAdminRequest } from '../../../../interfaces/api';
import { useToast } from '../../../../hooks/useToast';
import { useUpdatePasswordUserAdminMutation } from '../../../../redux/user/user.api';

const InputPassword = withDetailInputPassword(InputTextApp);

interface Props {
  userId: string,
}

export const AdminPasswordForm = ({ userId }: Props) => {
  const [ updatePassword, { isLoading }] = useUpdatePasswordUserAdminMutation();
  const { toast, showError, showSuccess } = useToast();

  return (
    <>
      <Toast ref={toast} />
      <Formik
        initialValues={{
          password: '',
          confirmPassword: '',
        }}
        onSubmit={async (values, { resetForm }) => {
          const request: UpdatePasswordAdminRequest = { id: userId, ...values };
          try {
            await updatePassword(request).unwrap();
            showSuccess({ detail: 'El usuario se actualizó con éxito' });
            resetForm();
          } catch (error) {
            processError({ error, showError });
          }
        }}
        validationSchema={Yup.object({
          password: Yup.string()
            .notOneOf([ Yup.ref('currentPassword') ], 'La nueva contraseña tiene que ser diferente')
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
                label="Contraseña*"
                id="password"
                name="password"
                className="w-full"
              />
            </div>

            <div className="field pt-2">
              <InputPassword
                label="Confirmar Contraseña*"
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
                loading={isLoading}
                disabled={!isValid || isSubmitting || !dirty}
              />
            </div>
          </Form>
        )}
      </Formik>
    </>
  );
};

export default AdminPasswordForm;
