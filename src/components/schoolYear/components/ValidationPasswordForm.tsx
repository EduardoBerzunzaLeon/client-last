import React, { useContext, useEffect } from 'react';
import { Formik, Form } from 'formik';
import * as Yup from 'yup';
import { InputTextApp } from '../../forms';
import { StepContext } from '../../stepWizard/stepContext';

export const ValidationPasswordForm = () => {
  const { setCanAdvance, passwordInput } = useContext(StepContext);

  useEffect(() => {
    setCanAdvance(false);

    return () => {
      passwordInput.current = '';
    };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div>
      <Formik
        initialValues={{
          password: passwordInput.current ?? '',
        }}
        enableReinitialize
        onSubmit={() => {}}
        validationSchema={Yup.object({
          password: Yup.string()
            .min(6, 'Mínimo 6 letras')
            .required('Requerido'),
        })}
      >
        {({ handleChange }) => (
          <Form>
            <div className="field pt-2">
              <InputTextApp
                label="Contraseña"
                name="password"
                id="password"
                type="password"
                className="w-full"
                toggleMask
                feedback={false}
                onChange={(e: React.ChangeEvent<any>) => {
                  setCanAdvance(e.target.value.length >= 6);
                  passwordInput.current = e.target.value;
                  handleChange(e);
                }}
              />
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default ValidationPasswordForm;
