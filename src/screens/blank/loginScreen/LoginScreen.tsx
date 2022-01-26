// import classNames from 'classnames';

import { InputText } from 'primereact/inputtext';
import { Card } from 'primereact/card';
import { useState } from 'react';

const LoginScreen = () => {
  const [ first, setFirst ] = useState('');
  return (
    <div>
      <Card
        title="Inicio de sesión"
        className="p-shadow-5"
        style={{ width: '28rem' }}
      >
        <form className="fluid">
          <div className="field">
            <label
              htmlFor="email"
            >
              Correo Electrónico
            </label>
            <div className="p-inputgroup">
              <span className="p-inputgroup-addon">
                <i className="pi pi-user" />
              </span>
              <InputText
                id="email"
                value={first}
                onChange={(e) => setFirst(e.target.value)}
                autoFocus
              />
            </div>
          </div>
        </form>
      </Card>
    </div>
  );
};

export default LoginScreen;
