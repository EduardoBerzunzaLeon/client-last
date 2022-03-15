import { Button } from 'primereact/button';
import { Card } from 'primereact/card';

import { Divider } from 'primereact/divider';
import { BreadCrumb } from 'primereact/breadcrumb';

import useAuth from '../../../hooks/useAuth';

import './profileScreen.scss';

const ProfileScreen = () => {
  const { user } = useAuth();
  const items = [
    { label: 'Perfil' },
  ];

  const home = { icon: 'pi pi-home', url: 'https://www.primefaces.org/primereact/showcase' };
  return (
    <>
      <div className="flex justify-content-between flex-wrap card-container">
        <h2 className="p-card-title font-bold">Información Personal</h2>
        <BreadCrumb model={items} home={home} />
      </div>
      <div className="grid">
        <div className="col-12 md:col-6 xl:col-4">
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
              <Divider align="left">
                <div className="inline-flex align-items-center text-purple-700">
                  <i className="pi pi-user mr-2" />
                  <b>Nombre</b>
                </div>
              </Divider>

              <span className="font-semibold">{user?.fullname}</span>
            </div>

            <div className="overflow-hidden text-overflow-ellipsis">
              <Divider align="left">
                <div className="inline-flex align-items-center text-purple-700">
                  <i className="pi pi-envelope mr-2" />
                  <b>Correo</b>
                </div>
              </Divider>

              <span className="font-semibold">{user?.email}</span>
            </div>

            <div className="overflow-hidden text-overflow-ellipsis">
              <Divider align="left">
                <div className="inline-flex align-items-center text-purple-700">
                  <i className="pi pi-question mr-2" />
                  <b>Género</b>
                </div>
              </Divider>

              <span className="font-semibold">{user?.gender === 'M' ? 'Masculino' : 'Femenino'}</span>
            </div>

            <div className="flex flex-column">
              <Button
                type="button"
                label="Editar Perfil"
                className="mt-3 flex align-items-center justify-content-center"
                icon="pi pi-pencil"
                iconPos="right"
              />
            </div>

          </Card>
        </div>
        <div className="col-12 md:col-6 xl:col-4">
          <Card title="Simple Card">
            <p className="m-0" style={{ lineHeight: '1.5' }}>
              Lorem ipsum dolor sit amet, consectetur adipisicing elit. I
              nventore sed consequuntur error repudiandae numquam deserunt
              quisquam repellat libero asperiores earum nam nobis, culp
              a ratione quam perferendis esse, cupiditate neque quas!
            </p>
          </Card>
        </div>
        <div className="col-12 md:col-6 xl:col-4">
          <Card title="Simple Card">
            <p className="m-0" style={{ lineHeight: '1.5' }}>
              Lorem ipsum dolor sit amet, consectetur adipisicing elit. I
              nventore sed consequuntur error repudiandae numquam deserunt
              quisquam repellat libero asperiores earum nam nobis, culp
              a ratione quam perferendis esse, cupiditate neque quas!
            </p>
          </Card>
        </div>
      </div>
    </>
  );
};

export default ProfileScreen;
