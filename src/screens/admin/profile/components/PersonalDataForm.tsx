import { Button } from 'primereact/button';
import { Form, Formik } from 'formik';
import { Toast } from 'primereact/toast';
import * as Yup from 'yup';

import { errorTranslateAuthForm, processError } from '../../../../utils/form/handlerErrorsForms';
import { genderRadio } from '../../../../utils/form/radioButtonsObjects';
import { InputTextApp, RadioGroup } from '../../../../components/forms';
import { setDataAuth } from '../../../../redux/auth/auth.slice';
import { UpdateUserRequest } from '../../../../interfaces/api/requests/userInterface';
import { useAppDispatch } from '../../../../redux/hooks';
import { User } from '../../../../interfaces/api';
import { useUpdateUserMutation } from '../../../../redux/user/user.api';
import useToast from '../../../../hooks/useToast';

interface Props { user: User, isUserLogged: boolean }

export const PersonalDataForm = ({ user, isUserLogged }: Props) => {
  const [ updateUser, { isLoading }] = useUpdateUserMutation();
  const dispatch = useAppDispatch();
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
            const updatedUser = await updateUser(newUser).unwrap();

            if (isUserLogged) {
              dispatch(setDataAuth({ user: updatedUser.data }));
            }

            showSuccess({ detail: 'El usuario se actualizo con éxito' });
          } catch (error) {
            const errors: string = processError({ error, showError });
            errorTranslateAuthForm({ errors, setFieldError });
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
