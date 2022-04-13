import { useState } from 'react';
import { Button } from 'primereact/button';
import { Form, Formik } from 'formik';
import { Toast } from 'primereact/toast';
import * as Yup from 'yup';

import { errorTranslateAuthForm, processError } from '../../../../utils/form/handlerErrorsForms';
import { genderRadio } from '../../../../utils/form/radioButtonsObjects';

import { InputTextApp, RadioGroup } from '../../../../components/forms';
import { User } from '../../../../interfaces/api';
import { useUpdateUserAdminMutation, useCreateUserMutation } from '../../../../redux/user/user.api';
import useToast from '../../../../hooks/useToast';
import { DropdownApp } from '../../../../components/forms/dropdown/DropdownApp';
import { ToggleButtonApp } from '../../../../components/forms/toggleButton/ToggleButtonApp';
import { FileSingleInputApp } from '../../../../components/forms/fileInput/FileSingleInputApp';

interface Props { user: User | undefined }

const initialValues = {
  first: '',
  last: '',
  gender: '',
  email: '',
  role: { name: 'Usuario', code: 'user' },
  blocked: false,
  avatar: null,
};

export const UserDataForm = ({ user }: Props) => {
  const [ updateUser, { isLoading: isLoadingUpdate }] = useUpdateUserAdminMutation();
  const [ createUser, { isLoading: isLoadingCreate }] = useCreateUserMutation();
  const [ initialUser ] = useState(user
    ? {
      first: user.name.first,
      last: user.name.last,
      gender: user.gender,
      email: user.email,
      blocked: user.blocked,
      role: { name: user.role === 'admin' ? 'Administrador' : 'Usuario', code: user.role },
      avatar: {
        objectURL: user?.avatar || '',
        name: 'avatar.png',
        lastModified: Date.now(),
        webkitRelativePath: '',
        size: 1,
        type: 'image/png',
      },
    }
    : initialValues);
  const { toast, showError, showSuccess } = useToast();

  const roles = [
    { name: 'Usuario', code: 'user' },
    { name: 'Administrador', code: 'admin' },
  ];

  return (
    <>
      <Toast ref={toast} />

      <Formik
        initialValues={initialUser}
        enableReinitialize
        onSubmit={async (values, { setFieldError }) => {
          const {
            last: lastUser, first: firstUser, role, avatar, ...restData
          } = values;

          try {
            if (user?.id) {
              const userUpdate = {
                id: user.id,
                name: { first: firstUser, last: lastUser },
                role: role.code,
                avatar: avatar?.objectURL,
                ...restData,
              };

              await updateUser(userUpdate).unwrap();
            } else {
              const newUser = {
                name: { first: firstUser, last: lastUser },
                avatar: avatar?.objectURL,
                role: '',
                ...restData,
              };

              await createUser(newUser).unwrap();
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
          email: Yup.string()
            .email('Email no tiene un formato valido')
            .required('Requerido'),
          gender: Yup.string()
            .required('Requerido'),
          role: Yup.object().required('Requerido'),
        })}
      >
        {({
          isValid, isSubmitting, dirty, setFieldValue,
        }) => (
          <Form>
            <FileSingleInputApp
              onChange={(primeFile) => {
                setFieldValue('file', primeFile);
              }}
              initialValue={initialUser.avatar}
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
              <DropdownApp
                id="role"
                inputId="role"
                name="role"
                options={roles}
                optionLabel="name"
                className="w-full"
                label="Rol"
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
                label="Cambiar Datos Personales"
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

export default UserDataForm;
