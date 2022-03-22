import { Button } from 'primereact/button';
import { Form, Formik } from 'formik';
import * as Yup from 'yup';

import { genderRadio } from '../../../../utils/form/radioButtonsObjects';
import { InputTextApp, RadioGroup } from '../../../../components/forms';

export const PersonalDataForm = () => (
  <Formik
    initialValues={{
      first: '',
      last: '',
      email: '',
      password: '',
      confirmPassword: '',
      gender: '',
    }}
    onSubmit={async () => {
      console.log('hi');
    }}
    validationSchema={Yup.object({
      first: Yup.string()
        .required('Requerido'),
      last: Yup.string()
        .required('Requerido'),
      gender: Yup.string()
        .required('Requerido'),
    })}
  >
    {({ isValid, isSubmitting, dirty }) => (
      <Form>

        <div className="field pt-2">
          <InputTextApp
            label="Nombre*"
            id="first"
            name="first"
            className="w-full"
            icon="pi pi-user"
          />
        </div>

        <div className="field pt-2">
          <InputTextApp
            label="Apellido(s)*"
            name="last"
            id="last"
            className="w-full"
            icon="pi pi-user-edit"
          />
        </div>

        <RadioGroup radios={genderRadio} />

        <div className="flex flex-column">
          <Button
            type="submit"
            label="Cambiar Datos Personales"
            className="mt-2 flex align-items-center justify-content-center"
            // loading={isLoading}
            disabled={!isValid || isSubmitting || !dirty}
          />
        </div>

      </Form>
    )}
  </Formik>
);

export default PersonalDataForm;
