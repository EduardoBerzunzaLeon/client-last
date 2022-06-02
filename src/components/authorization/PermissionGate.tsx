import { cloneElement, useMemo } from 'react';

import { AllowedRoles } from '../../interfaces/api';
import { Generic } from '../../interfaces/generic';
import PERMISSIONS_LIST, { ModulesName, PermissionsName } from './permissions';

import { useAuth } from '../../hooks/useAuth';

interface Props {
    children: JSX.Element,
    module: ModulesName,
    permission: PermissionsName,
    errorProps?: Generic,
    fallback?: JSX.Element | string,
    isMe?: boolean,
}

interface HasPermission {
  allowedRoles: AllowedRoles[],
  roles: AllowedRoles[],
}

const hasPermissions = ({ allowedRoles, roles }: HasPermission): boolean => {
  if (roles.length <= 0 || allowedRoles.length <= 0) {
    return false;
  }

  return !!roles.map((role) => allowedRoles.includes(role)).find((val) => val === true);
};

export function PermissionsGate({
  children,
  fallback,
  errorProps,
  module,
  permission,
  isMe,
}: Props) {
  const { user } = useAuth();

  const allowedRoles: AllowedRoles[] = PERMISSIONS_LIST[module][permission];

  const memoizedHasPermission = useMemo(() => {
    const roles = user?.roles ?? [];
    return hasPermissions({ allowedRoles, roles });
  }, [ allowedRoles, user ]);

  const permissionGranted = isMe || memoizedHasPermission;

  // eslint-disable-next-line react/jsx-no-useless-fragment
  if (!permissionGranted && !errorProps) return <>{fallback}</>;

  if (!permissionGranted && errorProps) return cloneElement(children, { ...errorProps });

  return children;
}

PermissionsGate.defaultProps = {
  fallback: undefined,
  errorProps: undefined,
  isMe: undefined,
};

export default PermissionsGate;
