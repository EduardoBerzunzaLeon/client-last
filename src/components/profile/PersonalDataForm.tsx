import { useContext, useState } from 'react';

import { Button } from 'primereact/button';
import { Form, Formik } from 'formik';
import * as Yup from 'yup';

import { InputTextApp, RadioGroup } from '../forms';
import { processError, setAuthFormErrors, genderRadio } from '../../utils';
import { setDataAuth } from '../../redux/auth/auth.slice';

import { useAppDispatch } from '../../redux/hooks';
import { User, UpdateUserRequest } from '../../interfaces';
import { useUpdateUserMutation } from '../../redux/user/user.api';
import { ToastContext } from '../../context';

interface Props {
  user: User,
  isUserLogged: boolean
}

export const PersonalDataForm = ({ user, isUserLogged }: Props) => {
  const [ updateUser, { isLoading }] = useUpdateUserMutation();
  const dispatch = useAppDispatch();
  const { showSuccess, showError } = useContext(ToastContext);
  const [ userSelected, setUserSelected ] = useState(user);

  const {
    name: { first, last }, gender, email, id,
  } = userSelected;

  return (
    <Formik
      initialValues={{
        first,
        last,
        gender,
        email,
      }}
      enableReinitialize
      onSubmit={async (values, { setFieldError }) => {
        const {
          last: lastUser, first: firstUser, gender: genderUser, email: emailUser,
        } = values;
        const newUser: UpdateUserRequest = {
          id,
          name: { first: firstUser, last: lastUser },
          gender: genderUser,
          email: emailUser,
        };

        try {
          const updatedUser = await updateUser(newUser).unwrap();
          setUserSelected({ ...updatedUser.data });
          if (isUserLogged) {
            dispatch(setDataAuth({ user: updatedUser.data }));
          }

          showSuccess({ detail: 'El usuario se actualizo con éxito' });
        } catch (error) {
          const errors: string = processError({ error, showError });
          setAuthFormErrors({ errors, setFieldError });
        }
      }}
      validationSchema={Yup.object({
        first: Yup.string()
          .required('Requerido'),
        last: Yup.string()
          .required('Requerido'),
        email: Yup.string()
          .email('Email no tiene un formato valido')
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

          <div className="field pt-2">
            <InputTextApp
              label="Email"
              name="email"
              id="email"
              keyfilter="email"
              className="w-full"
              icon="pi pi-envelope"
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
  );
};

export default PersonalDataForm;
