import { useState, useEffect } from 'react';

import { Button } from 'primereact/button';
import { Card } from 'primereact/card';
import { Dialog } from 'primereact/dialog';
import { TabView, TabPanel } from 'primereact/tabview';
import { useLocation, useParams } from 'react-router-dom';

import {
  Badge, Divider, HeaderAdmin, Skeleton, SpinnerRTK,
} from '../../../components/ui';
import { PasswordForm } from '../../../components/profile/PasswordForm';
import { PermissionsGate } from '../../../components/authorization/PermissionGate';
import { PersonalDataForm, ProfileImageForm, ProfileStudent } from '../../../components/profile';
import { ProfileProfessorScreen } from '../../../components/profileProfessors';
import { User } from '../../../interfaces';

import { useAuth } from '../../../hooks';
import { useGetUserQuery } from '../../../redux/user/user.api';

interface LocationProps {
  state: { root?: string } | null
}

const ProfileScreenMin = ({ data }: {data: User}) => {
  const [ isUserLogged, setIsUserLogged ] = useState(false);
  const [ displayModal, setDisplayModal ] = useState(false);
  const [ breadcrumbRoute, setBreadcrumbRoute ] = useState<string>('users/profile');
  const { user: userAuth } = useAuth();

  const { state } = useLocation() as LocationProps;

  useEffect(() => {
    if (data) {
      setIsUserLogged(userAuth?.id === data.id);
    }
  }, [ userAuth, data ]);

  useEffect(() => {
    if (state?.root) {
      setBreadcrumbRoute(`${state.root}/profile`);
    }
  }, [ state ]);

  return (
    <>
      <HeaderAdmin position={breadcrumbRoute} title="Información Personal" hasBreadcumbs />
      <div className="grid mb-4">

        <div className="col-12 md:col-6">
          <Card title="Perfil">
            <div className="flex justify-content-center">
              <Skeleton
                className="border-circle w-8rem h-8rem"
              >
                <Skeleton.Image
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

            <PermissionsGate
              module="user"
              permission="canUpdate"
              isMe={isUserLogged}
            >
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
            </PermissionsGate>
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

      {data?.roles.includes('professor') && (<ProfileProfessorScreen />)}
      {data?.roles.includes('student') && (<ProfileStudent />)}

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
