import { cloneElement } from 'react';
import { useAuth } from '../../hooks/useAuth';
import { Generic } from '../../interfaces/generic';
import { ErrorCard } from '../errorCard/ErrorCard';
import PERMISSIONS_LIST from './permissions';

interface Props {
    children: JSX.Element,
    fallback?: JSX.Element | string,
    errorProps: Generic,
    to: string
}

export default function PermissionsGate({
  children,
  fallback,
  errorProps,
  to,
}: Props) {
  const { user: { roles }} = useAuth();

  const permission: string[] = PERMISSIONS_LIST[to];

  const permissionGranted = hasPermission({ permissions, scopes });

  // eslint-disable-next-line react/jsx-no-useless-fragment
  if (!permissionGranted && !errorProps) return <>{fallback}</>;

  if (!permissionGranted && errorProps) return cloneElement(children, { ...errorProps });

  // eslint-disable-next-line react/jsx-no-useless-fragment
  return <>{children}</>;
}

PermissionsGate.defaultProps = {
  fallback: <ErrorCard
    title="Ocurrio un error en su petición"
    detail="No tiene permiso para realizar esta operación"
  />,
};
