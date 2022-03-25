import { Button } from 'primereact/button';
import { Form, Formik } from 'formik';
import * as Yup from 'yup';

import { Toast } from 'primereact/toast';
import { genderRadio } from '../../../../utils/form/radioButtonsObjects';
import { InputTextApp, RadioGroup } from '../../../../components/forms';
import { User } from '../../../../interfaces/api';
import { UpdateUserRequest } from '../../../../interfaces/api/requests/userInterface';
import { useUpdateUserMutation } from '../../../../redux/user/user.api';
import useToast from '../../../../hooks/useToast';
import { getDetailError } from '../../../../redux/services/handlerErrorApi';
import { errorTranslateAuthForm } from '../../../../utils/form/handlerErrorsForms';
import { translateAuthFields } from '../../../../utils/translate/translateFieldForms';

export const PersonalDataForm = ({ user }: {user: User }) => {
  const [ updateUser, { isLoading }] = useUpdateUserMutation();
  const { toast, showError, showSuccess } = useToast();
  const { name: { first, last }, gender, id } = user;

  return (
    <>
      <Toast ref={toast} />

      <Formik
        initialValues={{
          first,
          last,
          gender,
        }}
        onSubmit={async (values, { setFieldError }) => {
          const { last: lastUser, first: firstUser, gender: genderUser } = values;
          const newUser: UpdateUserRequest = {
            id,
            name: { first: firstUser, last: lastUser },
            gender: genderUser,
          };
          try {
            await updateUser(newUser).unwrap();
            showSuccess({
              summary: 'Éxito',
              detail: 'El usuario se actualizo con éxito',
              life: 2000,
            });
          } catch (error) {
            const detail: string = getDetailError(error);
            errorTranslateAuthForm({
              errors: detail,
              errorsTranslate: translateAuthFields,
              setFieldError,
            });
            showError({
              summary: 'Error',
              detail,
            });
          }
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

export default PersonalDataForm;
