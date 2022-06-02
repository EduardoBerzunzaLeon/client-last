import { useContext } from 'react';
import { useNavigate } from 'react-router-dom';

import classNames from 'classnames';
import { Button } from 'primereact/button';

import { ButtonUserBlocked } from '../ButtonUserBlocked';
import { User } from '../../../../../interfaces/api';
import { UserContext } from '../../context/userContext';
import { PermissionsGate } from '../../../../../components/authorization/PermissionGate';

export const ActionsBody = ({ user }: {user: User}) => {
  const { userAuth, setUserSelected, setDisplayModal } = useContext(UserContext);
  const { id } = user;
  const isUserLogged = id === userAuth?.id;
  const navigate = useNavigate();

  return (
    <>
      <Button icon="pi pi-eye" className="p-button-sm p-button-raised p-button-primary mr-1" onClick={() => navigate(`/admin/users/${id}`)} />
      <PermissionsGate
        module="user"
        permission="canUpdate"
      >
        <Button
          icon="pi pi-pencil"
          className={classNames('p-button-sm', 'p-button-raised', 'p-button-primary', 'mr-1', { 'p-disabled': isUserLogged })}
          onClick={() => {
            setUserSelected(user);
            setDisplayModal(true);
          }}
        />
      </PermissionsGate>
      <PermissionsGate
        module="user"
        permission="canDelete"
      >
        <ButtonUserBlocked user={user} isUserLogged={isUserLogged} />
      </PermissionsGate>
    </>
  );
};

export const ActionsBodyTemplate = (user: User) => <ActionsBody user={user} />;

export default {
  ActionsBody,
  ActionsBodyTemplate,
};
