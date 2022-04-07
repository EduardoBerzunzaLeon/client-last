import { Button } from 'primereact/button';
import { Form, Formik } from 'formik';
import { Toast } from 'primereact/toast';
import * as Yup from 'yup';

import { useState } from 'react';
import { ToggleButton } from 'primereact/togglebutton';
import { Dropdown } from 'primereact/dropdown';

import classNames from 'classnames';
import { errorTranslateAuthForm, processError } from '../../../../utils/form/handlerErrorsForms';
import { genderRadio } from '../../../../utils/form/radioButtonsObjects';

import { InputTextApp, RadioGroup } from '../../../../components/forms';
import { User } from '../../../../interfaces/api';
import { useUpdateUserAdminMutation, useCreateUserMutation } from '../../../../redux/user/user.api';
import useToast from '../../../../hooks/useToast';

interface Props { user: User | undefined }

export const UserDataForm = ({ user }: Props) => {
  const [ updateUser, { isLoading: isLoadingUpdate }] = useUpdateUserAdminMutation();
  const [ createUser, { isLoading: isLoadingCreate }] = useCreateUserMutation();

  const [ selectedCity1, setSelectedCity1 ] = useState<any>(null);
  const { toast, showError, showSuccess } = useToast();
  const [ checked1, setChecked1 ] = useState(false);

  const cities = [
    { name: 'Usuario', code: 'admin' },
    { name: 'Administrador', code: 'user' },
  ];

  const onCityChange = (e: { value: any}) => {
    setSelectedCity1(e.value);
  };

  return (
    <>
      <Toast ref={toast} />

      <Formik
        initialValues={{
          first: user?.name?.first || '',
          last: user?.name?.last || '',
          gender: user?.gender || '',
          email: user?.email || '',
          blocked: user?.blocked || false,
          role: user?.role || '',
          avatar: '',
        }}
        enableReinitialize
        onSubmit={async (values, { setFieldError }) => {
          const {
            last: lastUser, first: firstUser, ...restData
          } = values;

          try {
            if (user?.id) {
              const userUpdate = {
                id: user.id,
                name: { first: firstUser, last: lastUser },
                ...restData,
              };

              await updateUser(userUpdate).unwrap();
            } else {
              const newUser = {
                name: { first: firstUser, last: lastUser },
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

            <div className="field pt-2 w-full">
              <Dropdown value={selectedCity1} options={cities} onChange={onCityChange} optionLabel="name" placeholder="Elegir el role" />
            </div>

            <div className="field pt-2">
              <ToggleButton
                checked={checked1}
                className={classNames({
                  'bg-green-500': !checked1,
                  'bg-pink-600': checked1,
                })}
                onChange={(e) => setChecked1(e.value)}
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
