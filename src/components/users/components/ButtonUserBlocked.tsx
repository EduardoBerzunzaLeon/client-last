import { useContext } from 'react';
import { Button } from 'primereact/button';
import classNames from 'classnames';

import { processError } from '../../../utils';
import { User } from '../../../interfaces';
import { ToastContext } from '../../../context';

import { useUpdateBlockedUserAdminMutation } from '../../../redux/user/user.api';

interface Props {
    user: User;
    isUserLogged: boolean;
}

export const ButtonUserBlocked = ({ user, isUserLogged }: Props) => {
  const [ updateBlocked, { isLoading }] = useUpdateBlockedUserAdminMutation();

  const { showSuccess, showError } = useContext(ToastContext);

  const handlerClick = async ({ id, blocked }: User) => {
    try {
      await updateBlocked({ id, blocked: !blocked }).unwrap();
      showSuccess({ detail: 'Se cambio el status con éxito' });
    } catch (error) {
      processError({ error, showError });
    }
  };

  return (
    <Button
      icon={`pi pi-${user.blocked ? 'lock' : 'lock-open'}`}
      loading={isLoading}
      tooltip={user.blocked ? 'Desbloquear usuario' : 'Bloquear Usuario'}
      tooltipOptions={{ position: 'top' }}
      className={classNames('p-button-sm', 'p-button-raised', { 'p-disabled': isUserLogged, 'p-button-danger': user.blocked, 'p-button-success': !user.blocked })}
      onClick={() => handlerClick(user)}
    />
  );
};

export default ButtonUserBlocked;
