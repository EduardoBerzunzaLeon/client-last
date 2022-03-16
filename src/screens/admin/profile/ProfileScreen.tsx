import { useState } from 'react';

import { BreadCrumb } from 'primereact/breadcrumb';
import { Button } from 'primereact/button';
import { Card } from 'primereact/card';
import { Dialog } from 'primereact/dialog';

import CustomBadge from '../../../components/customBadge/CustomBadge';
import Divider from '../../../components/Divider/Divider';
import useAuth from '../../../hooks/useAuth';

import './profileScreen.scss';

const ProfileScreen = () => {
  const { user } = useAuth();
  const items = [
    { label: 'Perfil' },
  ];
  const home = { icon: 'pi pi-home', url: 'https://www.primefaces.org/primereact/showcase' };
  const [ displayModal, setDisplayModal ] = useState(false);

  const renderFooter = () => (
    <div>
      <Button label="No" icon="pi pi-times" onClick={() => setDisplayModal(false)} className="p-button-text" />
      <Button label="Yes" icon="pi pi-check" onClick={() => setDisplayModal(false)} autoFocus />
    </div>
  );

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
                <img
                  src="https://lh3.googleusercontent.com/a-/AOh14GgCTImJUSPX48BAHretaktttHcq-gangEKBbowa=s96-c"
                  alt="Profile"
                  className="border-circle border-purple-700 border-3 w-8rem h-8rem"
                  referrerPolicy="no-referrer"
                />
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

      <Dialog header="Editar Perfil" className="flex-grow-1 sm:flex-grow-0 flex" style={{ width: '450px' }} modal visible={displayModal} footer={renderFooter()} onHide={() => setDisplayModal(false)}>
        <p>
          Lorem ipsum do
        </p>
      </Dialog>
    </>
  );
};

export default ProfileScreen;
