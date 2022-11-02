// import React, { useContext, useEffect, useState } from 'react';
import { Formik, Form } from 'formik';
import * as Yup from 'yup';
import { InputTextApp } from '../../forms';
// import { StepContext } from './stepContext';

// const { setCanAdvance, passwordInput } = useContext(StepContext);
// const [ password ] = useState<string>(passwordInput.current ?? '');

// console.log(password);
// useEffect(() => {
//   setCanAdvance(false);

//   return () => {
//     passwordInput.current = '';
//   };
// // eslint-disable-next-line react-hooks/exhaustive-deps
// }, []);
export const Test = () => (
  <div>
    <Formik
      initialValues={{
        password: '',
      }}
      onSubmit={() => {}}
      validationSchema={Yup.object({
        passwsord: Yup.string()
          .min(6, 'Mínimo 6 letras')
          .required('Requerido'),
      })}
    >
      {() => (
        <Form>
          {/* <div className="field pt-2">
              <InputTextApp
                label="test"
                name="noespassowrd"
                id="noespassowrd"
                type="password"
                className="w-full"
                toggleMask
                feedback={false}
                // onChange={(e: React.ChangeEvent<any>) => {
                //   setCanAdvance(e.target.value.length >= 6);
                //   passwordInput.current = e.target.value;
                //   handleChange(e);
                // }}
              />
            </div> */}
          <div className="field pt-2">
            <InputTextApp
              label="Contraseña"
              name="password"
              id="password"
              type="password"
              className="w-full"
              toggleMask
              feedback={false}
            />
          </div>
        </Form>
      )}
    </Formik>
  </div>
);

export default Test;
