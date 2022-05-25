import { useState } from 'react';

import { Button } from 'primereact/button';
import { Form, Formik } from 'formik';
import { Toast } from 'primereact/toast';
import * as Yup from 'yup';

import { Dropdown } from 'primereact/dropdown';

import { FileSingleInputApp } from '../../../../components/forms/fileInput/FileSingleInputApp';
import { genderRadio } from '../../../../utils/forms/radioButtonObjects';
import { InputTextApp, RadioGroup } from '../../../../components/forms';
import { setAuthFormErrors, processError } from '../../../../utils/forms/handlerFormErrors';
import { ToggleButtonApp } from '../../../../components/forms/toggleButton/ToggleButtonApp';
import { User } from '../../../../interfaces/api';
import { useToast } from '../../../../hooks/useToast';
import { useUpdateUserAdminMutation, useCreateUserMutation } from '../../../../redux/user/user.api';
import { FormElement } from '../../../../components/forms/formElement/FormElement';
import { convertModelToFormData } from '../../../../utils/convertModelToFormData';

const initialValues = {
  first: '',
  last: '',
  gender: '',
  email: '',
  role: { name: 'Usuario', code: 'user' },
  blocked: false,
  avatar: null,
};

const uploadOptions = { icon: 'pi pi-fw pi-cloud-upload', iconOnly: true, className: 'hidden' };

export const UserDataForm = ({ user }: {user?: User }) => {
  const [ updateUser, { isLoading: isLoadingUpdate }] = useUpdateUserAdminMutation();
  const [ createUser, { isLoading: isLoadingCreate }] = useCreateUserMutation();

  const [ initialUser, setInitialUser ] = useState(user
    ? {
      first: user.name.first,
      last: user.name.last,
      gender: user.gender,
      email: user.email,
      blocked: user.blocked,
      role: { name: user.role === 'admin' ? 'Administrador' : 'Usuario', code: user.role },
      avatar: null,
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
        onSubmit={async (values, { setFieldError, resetForm }) => {
          const {
            role,
            blocked,
            ...rest
          } = values;

          const prepareData = {
            role: role.code, blocked: `${blocked}`, id: user?.id, ...rest,
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
          role: Yup.object().required('Requerido'),
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
              initialValue={user?.avatar ?? values?.avatar ?? ''}
              isLoading={isLoadingUpdate || isLoadingCreate}
              uploadOptions={uploadOptions}
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
                element={Dropdown}
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

UserDataForm.defaultProps = {
  user: undefined,
};

export default UserDataForm;
