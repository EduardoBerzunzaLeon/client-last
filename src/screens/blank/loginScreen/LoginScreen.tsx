import { useState } from 'react';

import { Link } from 'react-router-dom';

import { Button } from 'primereact/button';
import { Card } from 'primereact/card';
import { Divider } from 'primereact/divider';
import { InputText } from 'primereact/inputtext';
import { Password } from 'primereact/password';

import './loginScreen.scss';

// const header = (
//   <img
//     alt="login header"
//     src="../assets/images/admin-login.jpg"
//     onError={(e: React.SyntheticEvent<HTMLImageElement, Event>) => {
//       e.currentTarget.src = 'https://www.primefaces.org/wp-content/uploads/2020/05/placeholder.png';
//     }}
//   />
// );

const LoginScreen = () => {
  const [ first, setFirst ] = useState('');
  return (
    <Card
      title="¡Bienvenido!"
      subTitle="Inicio de Sesión"
      // header={header}
    >
      <form>

        <div className="field pt-2">
          <span className="p-float-label p-input-icon-right w-full">
            <i className="pi pi-envelope" />
            <InputText
              keyfilter="email"
              className=" w-full"
              id="email"
              value={first}
              onChange={(e) => setFirst(e.target.value)}
              autoFocus
            />
            <label htmlFor="email">Correo Electrónico</label>
          </span>
        </div>
        <div className="field pt-2">
          <div className="flex justify-content-end">

            <Link to="/forgot-password">
              ¿Olvidaste la contraseña?
            </Link>
          </div>
          <span className="p-float-label w-full">
            <Password
              className="inputfield w-full"
              toggleMask
              feedback={false}
            />
            <label htmlFor="email">Contraseña</label>
          </span>
        </div>

        <div className="flex flex-column">
          <Button type="submit" label="Enviar" className="mt-2 flex align-items-center justify-content-center" />
        </div>
        <div className="flex justify-content-end mt-1">
          <Link to="/register">
            No tengo cuenta
          </Link>
        </div>
      </form>

      <Divider align="center">
        <span className="p-card-subtitle">Ingresar por red social</span>
      </Divider>

      <div className="grid">
        <div className="col-12 lg:col-6">
          <Button type="submit" label="Google" className="mt-2 w-full" />
        </div>
        <div className="col-12 lg:col-6">
          <Button type="submit" label="Facebook" className="mt-2 w-full" />
        </div>
      </div>

    </Card>
  );
};

export default LoginScreen;
