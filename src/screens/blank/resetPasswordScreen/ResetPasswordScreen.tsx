import { Card } from 'primereact/card';

import { Button } from 'primereact/button';
import { Form, Formik } from 'formik';
import * as Yup from 'yup';

import InputTextApp from '../../../components/forms/InputTextApp';
import withDetailInputPassword from '../../../components/forms/withDetailInputPassword';

const InputPassword = withDetailInputPassword(InputTextApp);

const ResetPasswordScreen = () => (
  <Card
    title="¡Cambiar contraseña!"
  >
    <Formik
      initialValues={{
        password: '',
        confirmPassword: '',
      }}
      onSubmit={(values) => {
        console.log(values);
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
            <InputTextApp
              label="Contraseña"
              name="password"
              type="password"
              className="w-full"
              toggleMask
              feedback={false}
            />
          </div>

          <div className="field pt-2">
            <InputPassword
              label="Contraseña"
              name="password"
              className="w-full"
            />
          </div>

          <div className="flex flex-column">
            <Button type="submit" label="Cambiar contraseña" className="mt-2 flex align-items-center justify-content-center" disabled={!isValid || isSubmitting || !dirty} />
          </div>
        </Form>
      )}
    </Formik>
  </Card>
);

export default ResetPasswordScreen;
