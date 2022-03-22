import { useState } from 'react';

import { Button } from 'primereact/button';
import { Card } from 'primereact/card';
import { Dialog } from 'primereact/dialog';
import { TabView, TabPanel } from 'primereact/tabview';

import { Badge } from '../../../components/badge/Badge';
import { Divider } from '../../../components/Divider/Divider';
import { FileSingleUpload } from '../../../components/fileUpload/FileSingleUpload';
import { HeaderAdmin } from '../../../components/headerAdmin/HeaderAdmin';
import { PasswordForm } from './components/PasswordForm';
import { PersonalDataForm } from './components/PersonalDataForm';
import { Skeleton } from '../../../components/Skeleton/Skeleton';
import useAuth from '../../../hooks/useAuth';

import './profileScreen.scss';

const ProfileScreen = () => {
  const { user } = useAuth();
  const [ displayModal, setDisplayModal ] = useState(false);

  return (
    <>
      <HeaderAdmin position="users/profile" title="Información Personal" />
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
              <Badge
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
              <Badge
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
            <FileSingleUpload url="https://primefaces.org/primereact/showcase/upload.php" />
            <Divider text="Información Personal" icon="user" />
            <PersonalDataForm />
          </TabPanel>
          <TabPanel header="Cambiar contraseña">
            <PasswordForm />
          </TabPanel>
        </TabView>
      </Dialog>
    </>
  );
};

export default ProfileScreen;
