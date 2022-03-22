import { Button } from 'primereact/button';
import { Form, Formik } from 'formik';
import * as Yup from 'yup';

import { InputTextApp, withDetailInputPassword } from '../../../../components/forms';

const InputPassword = withDetailInputPassword(InputTextApp);

export const PasswordForm = () => (
  <Formik
    initialValues={{
      password: '',
      confirmPassword: '',
    }}
    onSubmit={() => {
      console.log('');
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
          />
        </div>
      </Form>
    )}
  </Formik>
);

export default PasswordForm;
