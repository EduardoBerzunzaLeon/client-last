import { useState } from 'react';

import { Link } from 'react-router-dom';

import { Button } from 'primereact/button';
import { Card } from 'primereact/card';
import { InputText } from 'primereact/inputtext';
import { Password } from 'primereact/password';
import { RadioButton } from 'primereact/radiobutton';

const RegisterScreen = () => {
  const [ first, setFirst ] = useState('');
  const [ city, setCity ] = useState(null);
  return (
    <Card
      title="¡Registrarme!"
      subTitle="Crear una cuenta"
    >
      <form>

        <div className="field pt-2">
          <span className="p-float-label p-input-icon-right w-full">
            <i className="pi pi-user" />
            <InputText
              className=" w-full"
              id="first"
              value={first}
              onChange={(e) => setFirst(e.target.value)}
              autoFocus
            />
            <label htmlFor="first">Nombre*</label>
          </span>
        </div>

        <div className="field pt-2">
          <span className="p-float-label p-input-icon-right w-full">
            <i className="pi pi-user-edit" />
            <InputText
              className=" w-full"
              id="last"
              value={first}
              onChange={(e) => setFirst(e.target.value)}
            />
            <label htmlFor="last">Apellido(s)*</label>
          </span>
        </div>

        <div className="field pt-2">
          <span className="p-float-label p-input-icon-right w-full">
            <i className="pi pi-envelope" />
            <InputText
              keyfilter="email"
              className=" w-full"
              id="email"
              value={first}
              onChange={(e) => setFirst(e.target.value)}
            />
            <label htmlFor="email">Correo Electrónico*</label>
          </span>
        </div>

        <div className="field pt-2">
          <span className="p-float-label w-full">
            <Password
              className="inputfield w-full"
              toggleMask
            />
            <label htmlFor="email">Contraseña*</label>
          </span>
        </div>

        <div className="field pt-2">
          <span className="p-float-label w-full">
            <Password
              className="inputfield w-full"
              toggleMask
            />
            <label htmlFor="email">Confirmar contraseña*</label>
          </span>
        </div>

        <div className="flex field pt-2 justify-content-start">
          <div className="field-radiobutton">
            <RadioButton inputId="city3" name="city" value="M" onChange={(e) => setCity(e.value)} checked={city === 'New York'} />
            <label htmlFor="city3">Masculino</label>
          </div>
          <div className="field-radiobutton ml-2">
            <RadioButton inputId="city4" name="city" value="F" onChange={(e) => setCity(e.value)} checked={city === 'San Francisco'} />
            <label htmlFor="city4">Femenino</label>
          </div>
        </div>

        <div className="flex flex-column">
          <Button type="submit" label="Enviar" className="mt-2 flex align-items-center justify-content-center" />
        </div>
        <div className="flex justify-content-end mt-1">
          <Link to="/login">
            Ya tengo una cuenta
          </Link>
        </div>
      </form>

    </Card>
  );
};

export default RegisterScreen;
