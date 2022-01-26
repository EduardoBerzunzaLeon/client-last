import { useState } from 'react';

import { Link, useNavigate } from 'react-router-dom';

import { Button } from 'primereact/button';
import { Card } from 'primereact/card';
import { InputText } from 'primereact/inputtext';

const ForgotPasswordScreen = () => {
  const [ first, setFirst ] = useState('');
  const navigate = useNavigate();
  return (
    <Card
      title="¡Restablecer contraseña!"
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
        <div className="flex flex-column">
          <Button
            onClick={() => {
              navigate('/reset-password');
            }}
            label="Enviar correo de cambio de contraseña"
            className="mt-2 flex align-items-center justify-content-center"
          />
        </div>
        <div className="flex justify-content-end mt-1">
          <Link to="/login">
            Ya recorde mi clave
          </Link>
        </div>
      </form>

    </Card>
  );
};

export default ForgotPasswordScreen;
