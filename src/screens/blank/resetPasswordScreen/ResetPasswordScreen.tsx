import { Card } from 'primereact/card';

import { Password } from 'primereact/password';
import { Button } from 'primereact/button';

const ResetPasswordScreen = () => (
  <Card
    title="¡Cambiar contraseña!"
  >
    <form>
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

      <div className="flex flex-column">
        <Button type="submit" label="Cambiar contraseña" className="mt-2 flex align-items-center justify-content-center" />
      </div>
    </form>

  </Card>
);

export default ResetPasswordScreen;
