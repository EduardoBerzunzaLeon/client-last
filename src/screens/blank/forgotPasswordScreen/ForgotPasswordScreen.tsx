import { Link, useNavigate } from 'react-router-dom';

import { Button } from 'primereact/button';
import { Card } from 'primereact/card';
import { Form, Formik } from 'formik';
import * as Yup from 'yup';

import InputTextApp from '../../../components/forms/InputTextApp';

const ForgotPasswordScreen = () => {
  const navigate = useNavigate();
  return (
    <Card
      title="¡Restablecer contraseña!"
    >
      <Formik
        initialValues={{ email: '' }}
        onSubmit={(values) => {
          console.log(values);
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
                keyfilter="email"
                className="w-full"
                icon="pi pi-envelope"
                autoFocus
              />
            </div>
            <div className="flex flex-column">
              <Button
                onClick={() => {
                  navigate('/reset-password');
                }}
                label="Enviar correo de cambio de contraseña"
                className="mt-2 flex align-items-center justify-content-center"
                disabled={!isValid || isSubmitting || !dirty}
              />
            </div>
            <div className="flex justify-content-end mt-1">
              <Link to="/login">
                Ya recorde mi clave
              </Link>
            </div>
          </Form>
        )}
      </Formik>

    </Card>
  );
};

export default ForgotPasswordScreen;
