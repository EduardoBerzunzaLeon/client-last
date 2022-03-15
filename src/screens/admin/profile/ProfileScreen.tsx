import { Card } from 'primereact/card';

import { Divider } from 'primereact/divider';
import useAuth from '../../../hooks/useAuth';

import './profileScreen.scss';

const ProfileScreen = () => {
  const { user } = useAuth();
  return (
    <div className="grid">
      <div className="col-12 md:col-6 xl:col-4">
        <Card title="Perfil">
          <div className="flex justify-content-center">
            <figure>
              <img
                src="https://lh3.googleusercontent.com/a-/AOh14GgCTImJUSPX48BAHretaktttHcq-gangEKBbowa=s96-c"
                alt="Profile"
                className="border-circle w-8rem h-8rem"
                referrerPolicy="no-referrer"
              />
            </figure>
          </div>

          <div className="overflow-hidden text-overflow-ellipsis">
            <Divider align="left">
              <div className="inline-flex align-items-center">
                <i className="pi pi-user mr-2" />
                <b>Nombre</b>
              </div>
            </Divider>

            <span>{user?.fullname}</span>
          </div>

          <div className="overflow-hidden text-overflow-ellipsis">
            <h5 className="font-semibold mt-3">Correo</h5>
            <span>{user?.email}</span>
          </div>

          <div className="overflow-hidden text-overflow-ellipsis">
            <h5 className="font-semibold mt-3">Género</h5>
            <span>{user?.gender === 'M' ? 'Aliade' : 'Femenino'}</span>
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
  );
};

export default ProfileScreen;
