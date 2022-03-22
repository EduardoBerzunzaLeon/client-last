import React from 'react';

import { FooterInputPassword } from './FooterInputPassword';

export const withDetailInputPassword = <P extends object>
  (Component: React.ComponentType<P>) => (props: P) => (
    <Component
      {...props}
      toggleMask
      keyfilter={/[^\s]/}
      footer={FooterInputPassword}
      promptLabel="Ingresa una contraseña"
      weakLabel="Débil"
      mediumLabel="Moderada"
      strongLabel="Difícil"
      type="password"
    />
  );

export default withDetailInputPassword;
