import React from 'react';
import footerInputPassword from './FooterInputPassword';

const withDetailInputPassword = <P extends object>
  (Component: React.ComponentType<P>) => (props: P) => (
    <Component
      {...props}
      toggleMask
      keyfilter={/[^\s]/}
      footer={footerInputPassword}
      promptLabel="Ingresa una contraseña"
      weakLabel="Débil"
      mediumLabel="Moderada"
      strongLabel="Difícil"
      type="password"
    />
  );

export default withDetailInputPassword;
