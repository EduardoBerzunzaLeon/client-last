import { useState } from 'react';

import { Button } from 'primereact/button';
import { Form, Formik } from 'formik';
import { MultiSelect } from 'primereact/multiselect';
import { Toast } from 'primereact/toast';
import * as Yup from 'yup';

import {
  convertModelToFormData,
  convertRoles,
  genderRadio,
  processError,
  roles,
  setAuthFormErrors,
} from '../../../utils';
import {
  FileSingleInputApp,
  FormElement,
  InputTextApp,
  RadioGroup,
  ToggleButtonApp,
  uploadOptions,
} from '../../forms';
import { User } from '../../../interfaces';

import { useToast } from '../../../hooks';
import { useUpdateUserAdminMutation, useCreateUserMutation } from '../../../redux/user/user.api';

const initialValues = {
  first: '',
  last: '',
  gender: '',
  email: '',
  roles: [{ name: 'Estudiante', code: 'student' }],
  blocked: false,
  avatar: null,
};

interface Props {
  buttonLabel: string,
  user?: User
}

export const UserDataForm = ({ buttonLabel, user }: Props) => {
  const [ updateUser, { isLoading: isLoadingUpdate }] = useUpdateUserAdminMutation();
  const [ createUser, { isLoading: isLoadingCreate }] = useCreateUserMutation();

  const [ initialUser, setInitialUser ] = useState(user
    ? {
      first: user.name.first,
      last: user.name.last,
      gender: user.gender,
      email: user.email,
      blocked: user.blocked,
      roles: convertRoles(user.roles),
      avatar: user.avatar,
    }
    : initialValues);

  const { toast, showError, showSuccess } = useToast();

  return (
    <>
      <Toast ref={toast} />

      <Formik
        initialValues={initialUser}
        enableReinitialize
        onSubmit={async (values, { setFieldError, resetForm }) => {
          const {
            roles: savedRoles,
            blocked,
            ...rest
          } = values;

          const rolesDB: string[] = savedRoles.map(({ code }) => code);

          const prepareData = {
            roles: rolesDB, blocked: `${blocked}`, id: user?.id, ...rest,
          };

          const dataSend = convertModelToFormData(prepareData);

          let message = 'El usuario se actualizó con éxito';

          try {
            if (user?.id) {
              await updateUser(dataSend).unwrap();
              setInitialUser({ ...values });
            } else {
              await createUser(dataSend).unwrap();
              message = 'El usuario se creó con éxito';
              resetForm();
            }

            showSuccess({ detail: message });
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
          roles: Yup.array().required('Requerido'),
        })}
      >
        {({
          isValid, isSubmitting, dirty, setFieldValue, values,
        }) => (
          <Form>
            <FileSingleInputApp
              onChange={(primeFile) => {
                setFieldValue('avatar', primeFile);
              }}
              initialValue={values?.avatar ?? initialUser?.avatar ?? ''}
              isLoading={isLoadingUpdate || isLoadingCreate}
              uploadOptions={uploadOptions}
              hasPersistence={Boolean(user?.id)}
            />
            <div className="field pt-2 mt-4">
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

            <div className="field pt-2">
              <FormElement
                element={MultiSelect}
                options={roles}
                id="roles"
                inputId="roles"
                name="roles"
                optionLabel="name"
                label="Roles"
                className="w-full"
                display="chip"
              />
            </div>

            <RadioGroup radios={genderRadio} />

            <div className="field pt-2">
              <ToggleButtonApp
                name="blocked"
                onClassName="color-danger"
                offClassName="bg-green-500"
                onIcon="pi pi-lock"
                offIcon="pi pi-lock-open"
                onLabel="Bloqueado"
                offLabel="Desbloqueado"
              />
            </div>

            <div className="flex flex-column">
              <Button
                type="submit"
                label={buttonLabel}
                className="mt-2 flex align-items-center justify-content-center"
                loading={isLoadingUpdate || isLoadingCreate}
                disabled={!isValid || isSubmitting || !dirty}
              />
            </div>

          </Form>
        )}
      </Formik>
    </>
  );
};

UserDataForm.defaultProps = {
  user: undefined,
};

export default UserDataForm;
