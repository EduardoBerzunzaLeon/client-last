import { useRef, useState } from 'react';
// FileUploadSelectParams,
// FileUploadUploadParams,
import {
  FileUpload,
  FileUploadHeaderTemplateOptions,
  FileUploadItemTemplateType,
} from 'primereact/fileupload';
import { BreadCrumb } from 'primereact/breadcrumb';
import { Button } from 'primereact/button';
import { Card } from 'primereact/card';
import { Dialog } from 'primereact/dialog';
import { Form, Formik } from 'formik';
import { TabView, TabPanel } from 'primereact/tabview';
// import { ProgressBar } from 'primereact/progressbar';
// import { Tag } from 'primereact/tag';
import * as Yup from 'yup';

import { CustomBadge } from '../../../components/customBadge/CustomBadge';
import { Divider } from '../../../components/Divider/Divider';
import { genderRadio } from '../../../utils/form/radioButtonsObjects';
import { InputTextApp, RadioGroup, withDetailInputPassword } from '../../../components/forms';
import { Skeleton } from '../../../components/Skeleton/Skeleton';
import useAuth from '../../../hooks/useAuth';

import './profileScreen.scss';

interface PrimeFile {
  objectURL: string,
name: string,
lastModified: number,
webkitRelativePath: string,
size: number,
type: string
}

const InputPassword = withDetailInputPassword(InputTextApp);

const ProfileScreen = () => {
  const { user } = useAuth();
  const items = [
    { label: 'Perfil' },
  ];
  // const [ disabled, setDisabled ] = useState(false);
  const home = { icon: 'pi pi-home', url: 'https://www.primefaces.org/primereact/showcase' };
  const [ displayModal, setDisplayModal ] = useState(false);
  // const toast = useRef<any>(null);
  const fileUploadRef = useRef<any>(null);

  const onTemplateSelect = () => {
    if (fileUploadRef.current.files.length > 1) {
      fileUploadRef.current.files.shift();
    }
  };

  const headerTemplate = (options: FileUploadHeaderTemplateOptions) => {
    const {
      className, chooseButton, uploadButton, cancelButton,
    } = options;

    return (
      <div className={className} style={{ backgroundColor: 'transparent', display: 'flex', alignItems: 'center' }}>
        {chooseButton}
        {uploadButton}
        {cancelButton}
      </div>
    );
  };

  const itemTemplate: FileUploadItemTemplateType = (file: PrimeFile) => (
    <img alt={file.name} role="presentation" style={{ width: '100%' }} src={file.objectURL} />
  );

  const emptyTemplate = () => (
    <div className="flex align-items-center flex-column">
      <i
        className="pi pi-image mt-3 p-5"
        style={{
          fontSize: '5em', borderRadius: '50%', backgroundColor: 'var(--surface-b)', color: 'var(--surface-d)',
        }}
      />
      <span style={{ fontSize: '1.2em', color: 'var(--text-color-secondary)' }} className="my-5">Drag and Drop Image Here</span>
    </div>
  );

  const chooseOptions = { icon: 'pi pi-fw pi-images', iconOnly: true, className: 'custom-choose-btn p-button-rounded p-button-outlined' };
  const uploadOptions = { icon: 'pi pi-fw pi-cloud-upload', iconOnly: true, className: 'custom-upload-btn p-button-success p-button-rounded p-button-outlined' };
  const cancelOptions = { icon: 'pi pi-fw pi-times', iconOnly: true, className: 'custom-cancel-btn p-button-danger p-button-rounded p-button-outlined' };

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
                <Skeleton classNameSkeleton="border-circle w-8rem h-8rem">
                  <img
                    src="https://lh3.googleusercontent.com/a-/AOh14GgCTImJUSPX48BAHretaktttHcq-gangEKBbowa=s96-c"
                    alt="Profile"
                    className="border-circle border-purple-700 border-3 w-8rem h-8rem"
                    referrerPolicy="no-referrer"
                  />
                </Skeleton>
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
            <Divider text="Foto de perfil" icon="image" />
            <FileUpload
              ref={fileUploadRef}
              name="profile[]"
              url="https://primefaces.org/primereact/showcase/upload.php"
              accept="image/*"
              maxFileSize={1000000}
              multiple
              onSelect={onTemplateSelect}
              headerTemplate={headerTemplate}
              itemTemplate={itemTemplate}
              emptyTemplate={emptyTemplate}
              chooseOptions={chooseOptions}
              uploadOptions={uploadOptions}
              cancelOptions={cancelOptions}
            />
            <Divider text="Información Personal" icon="user" />
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
