import { useState, useEffect } from 'react';

import { Button } from 'primereact/button';
import { Card } from 'primereact/card';
import { Dialog } from 'primereact/dialog';
import { TabView, TabPanel } from 'primereact/tabview';
import { useParams } from 'react-router-dom';

import { Badge } from '../../../components/badge/Badge';
import { Divider } from '../../../components/divider/Divider';
import { HeaderAdmin } from '../../../components/headerAdmin/HeaderAdmin';
import { PasswordForm } from './components/PasswordForm';
import { PersonalDataForm } from './components/PersonalDataForm';
import { ProfileImageForm } from './components/ProfileImageForm';
import { Skeleton, SkeletonImage } from '../../../components/skeleton';
import { SpinnerRTK } from '../../../components/spinnerRTK/SpinnerRTK';
import { useAuth } from '../../../hooks/useAuth';
import { useGetUserQuery } from '../../../redux/user/user.api';
import { User } from '../../../interfaces/api';

const ProfileScreenMin = ({ data }: {data: User}) => {
  const [ isUserLogged, setIsUserLogged ] = useState(false);
  const [ displayModal, setDisplayModal ] = useState(false);
  const { user: userAuth } = useAuth();

  useEffect(() => {
    if (data) {
      setIsUserLogged(userAuth?.id === data.id);
    }
  }, [ userAuth, data ]);

  return (
    <>
      <HeaderAdmin position="users/profile" title="Información Personal" />
      <div className="grid">

        <div className="col-12 md:col-6">
          <Card title="Perfil">
            <div className="flex justify-content-center">
              <Skeleton
                className="border-circle w-8rem h-8rem"
              >
                <SkeletonImage
                  src={data?.avatar}
                  alt="Profile"
                  className="border-circle border-purple-700 border-3 w-8rem h-8rem"
                  referrerPolicy="no-referrer"
                />
              </Skeleton>
            </div>

            <div className="overflow-hidden text-overflow-ellipsis">
              <Divider text="Nombre" icon="user" />
              <span className="font-semibold">{data.fullname}</span>
            </div>

            <div className="overflow-hidden text-overflow-ellipsis">
              <Divider text="Correo" icon="envelope" />
              <span className="font-semibold">{data.email}</span>
            </div>

            <div className="overflow-hidden text-overflow-ellipsis">
              <Divider text="Sexo" icon="question" />
              <span className="font-semibold">{data.gender === 'M' ? 'Hombre' : 'Mujer'}</span>
            </div>

            {
             (userAuth?.roles.includes('admin') || isUserLogged)
             && (
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
             )
            }

          </Card>
        </div>

        <div className="col-12 md:col-6">
          <Card title="Datos del sistema">
            <div className="overflow-hidden text-overflow-ellipsis">
              <Divider text="Roles" icon="shield" />
              <span className="font-semibold flex">{data.roles.join(', ').toUpperCase()}</span>
            </div>

            <div className="overflow-hidden text-overflow-ellipsis py-1">
              <Divider text="Activo" icon="key" />
              <Badge
                text={data?.active ? 'Activo' : 'Inactivo'}
                matchObject={{
                  true: 'success',
                  false: 'danger',
                }}
                match={data!.active.toString()}
              />
            </div>

            <div className="overflow-hidden text-overflow-ellipsis py-1">
              <Divider text="Bloqueado" icon="unlock" />
              <Badge
                text={data?.blocked ? 'Bloqueado' : 'Desbloqueado'}
                matchObject={{
                  true: 'danger',
                  false: 'success',
                }}
                match={data!.blocked.toString()}
              />
            </div>
          </Card>
        </div>

      </div>

      <Dialog header="Editar Perfil" className="shadow-5 w-11 md:w-6 lg:w-5" modal visible={displayModal} onHide={() => setDisplayModal(false)}>
        <TabView>
          <TabPanel header="Datos Personales">
            {
              (isUserLogged) && (
                <>
                  <Divider text="Foto de perfil" icon="image" />
                  <ProfileImageForm />
                </>
              )
            }
            <Divider text="Información Personal" icon="user" />
            <PersonalDataForm user={data} isUserLogged={isUserLogged} />
          </TabPanel>
          {
              (isUserLogged) && (
                <TabPanel header="Cambiar contraseña">
                  <PasswordForm userId={data.id} />
                </TabPanel>
              )
            }

        </TabView>
      </Dialog>
    </>
  );
};

export const ProfileScreen = () => {
  const { id } = useParams();

  const {
    data, isError, error, isLoading,
  } = useGetUserQuery(id ?? '');

  return (
    <SpinnerRTK
      data={data}
      error={error}
      isError={isError}
      isLoading={isLoading}
    >
      {
        ({ data: dataSend }) => (
          <ProfileScreenMin data={dataSend} />
        )
      }
    </SpinnerRTK>
  );
};

export default ProfileScreen;
