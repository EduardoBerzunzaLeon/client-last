import React, { useState } from 'react';

import { BreadCrumb } from 'primereact/breadcrumb';
import { Button } from 'primereact/button';
import { Card } from 'primereact/card';
import { Dialog } from 'primereact/dialog';
import { TabView, TabPanel } from 'primereact/tabview';
import * as Yup from 'yup';

import { Form, Formik } from 'formik';
import CustomBadge from '../../../components/customBadge/CustomBadge';
import Divider from '../../../components/Divider/Divider';
import useAuth from '../../../hooks/useAuth';

import './profileScreen.scss';
import { genderRadio } from '../../../utils/form/radioButtonsObjects';
import { InputTextApp, RadioGroup, withDetailInputPassword } from '../../../components/forms';
import { WithSkeleton } from '../../../components/withSkeleton/WithSkeleton';

const InputPassword = withDetailInputPassword(InputTextApp);

const ProfileScreen = () => {
  const { user } = useAuth();
  const items = [
    { label: 'Perfil' },
  ];
  const home = { icon: 'pi pi-home', url: 'https://www.primefaces.org/primereact/showcase' };
  const [ displayModal, setDisplayModal ] = useState(false);

  // const renderFooter = () => (
  //   <div>
  //     <Button label
  // ="No" icon="pi pi-times" onClick={() => setDisplayModal(false)} className="p-button-text" />
  //     <Button label="Yes" icon="pi pi-check" onClick={() => setDisplayModal(false)} autoFocus />
  //   </div>
  // );

  return (
    <>
      <div className="flex justify-content-between flex-wrap card-container">
        <h2 className="p-card-title font-bold">Información Personal</h2>
        <BreadCrumb model={items} home={home} />
      </div>
      <div className="grid">

        <div className="col-12 md:col-6">
          <Card title="Perfil">
            <div className="flex justify-content-center">
              <figure>
                <WithSkeleton classNameSkeleton="border-circle w-8rem h-8rem">
                  <img
                    src="https://lh3.googleusercontent.com/a-/AOh14GgCTImJUSPX48BAHretaktttHcq-gangEKBbowa=s96-c"
                    alt="Profile"
                    className="border-circle border-purple-700 border-3 w-8rem h-8rem"
                    referrerPolicy="no-referrer"
                  />
                </WithSkeleton>
                {/* <ImgWithSkeleton

                /> */}
                {/* {
                loadImage && <Skeleton className="border-circle w-8rem h-8rem" />
              }
                <img
                  src="https://lh3.googleusercontent.com/a-/AOh14GgCTImJUSPX48BAHretaktttHcq-gangEKBbowa=s96-c"
                  alt="Profile"
                  className="border-circle border-purple-700 border-3 w-8rem h-8rem"
                  referrerPolicy="no-referrer"
                  style={loadImage ? { display: 'none' } : {}}
                  onLoad={() => setLoadImage(false)}
                /> */}
              </figure>
            </div>

            <div className="overflow-hidden text-overflow-ellipsis">
              <Divider text="Nombre" icon="user" />
              <span className="font-semibold">{user?.fullname}</span>
            </div>

            <div className="overflow-hidden text-overflow-ellipsis">
              <Divider text="Correo" icon="envelope" />
              <span className="font-semibold">{user?.email}</span>
            </div>

            <div className="overflow-hidden text-overflow-ellipsis">
              <Divider text="Sexo" icon="question" />
              <span className="font-semibold">{user?.gender === 'M' ? 'Hombre' : 'Mujer'}</span>
            </div>

            <div className="flex flex-column">
              <Button
                type="button"
                label="Editar Perfil"
                className="mt-3 flex align-items-center justify-content-center"
                icon="pi pi-pencil"
                iconPos="right"
                onClick={() => setDisplayModal(true)}
              />
            </div>

          </Card>
        </div>

        <div className="col-12 md:col-6">
          <Card title="Datos del sistema">
            <div className="overflow-hidden text-overflow-ellipsis">
              <Divider text="Rol" icon="shield" />
              <span className="font-semibold">{user?.role}</span>
            </div>

            <div className="overflow-hidden text-overflow-ellipsis py-1">
              <Divider text="Activo" icon="key" />
              <CustomBadge
                text={user?.active ? 'Activo' : 'Inactivo'}
                matchObject={{
                  true: 'success',
                  false: 'danger',
                }}
                match={user!.active.toString()}
              />
            </div>

            <div className="overflow-hidden text-overflow-ellipsis py-1">
              <Divider text="Bloqueado" icon="unlock" />
              <CustomBadge
                text={user?.blocked ? 'Bloqueado' : 'Desbloqueado'}
                matchObject={{
                  true: 'danger',
                  false: 'success',
                }}
                match={user!.blocked.toString()}
              />
            </div>
          </Card>
        </div>

      </div>

      <Dialog header="Editar Perfil" className="shadow-5 w-11 md:w-6 lg:w-5" modal visible={displayModal} onHide={() => setDisplayModal(false)}>

        <TabView>
          <TabPanel header="Datos Personales">
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
          </TabPanel>
          <TabPanel header="Cambiar contraseña">
            <Formik
              initialValues={{
                password: '',
                confirmPassword: '',
              }}
              onSubmit={() => {
                console.log('');
              }}
              validationSchema={Yup.object({
                password: Yup.string()
                  .min(6, 'Mínimo 6 letras')
                  .required('Requerido'),
                confirmPassword: Yup.string()
                  .oneOf([ Yup.ref('password') ], 'Las contraseñas tienen que ser iguales')
                  .required('Requerido'),
              })}
            >
              {({ isValid, isSubmitting, dirty }) => (
                <Form>
                  <div className="field pt-2">
                    <InputPassword
                      label="Contraseña"
                      id="password"
                      name="password"
                      className="w-full"
                    />
                  </div>

                  <div className="field pt-2">
                    <InputPassword
                      label="Confirmar Contraseña"
                      name="confirmPassword"
                      id="confirmPassword"
                      className="w-full"
                    />
                  </div>

                  <div className="flex flex-column">
                    <Button
                      type="submit"
                      label="Cambiar contraseña"
                      className="mt-2 flex align-items-center justify-content-center"
                      disabled={!isValid || isSubmitting || !dirty}
                      // loading={isLoading}
                    />
                  </div>
                </Form>
              )}
            </Formik>
          </TabPanel>
        </TabView>
      </Dialog>
    </>
  );
};

export default ProfileScreen;
