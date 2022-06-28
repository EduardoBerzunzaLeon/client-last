import { Button } from 'primereact/button';
import { Toast } from 'primereact/toast';
import classNames from 'classnames';

import { processError } from '../../../utils';
import { User } from '../../../interfaces';

import { useToast } from '../../../hooks';
import { useUpdateBlockedUserAdminMutation } from '../../../redux/user/user.api';

interface Props {
    user: User;
    isUserLogged: boolean;
}

export const ButtonUserBlocked = ({ user, isUserLogged }: Props) => {
  const [ updateBlocked, { isLoading }] = useUpdateBlockedUserAdminMutation();

  const { toast, showError, showSuccess } = useToast();

  const handlerClick = async ({ id, blocked }: User) => {
    try {
      await updateBlocked({ id, blocked: !blocked }).unwrap();
      showSuccess({ detail: 'Se cambio el status con éxito' });
    } catch (error) {
      processError({ error, showError });
    }
  };

  return (
    <>
      <Toast ref={toast} />
      <Button
        icon={`pi pi-${user.blocked ? 'lock' : 'lock-open'}`}
        loading={isLoading}
        className={classNames('p-button-sm', 'p-button-raised', { 'p-disabled': isUserLogged, 'p-button-danger': user.blocked, 'p-button-success': !user.blocked })}
        onClick={() => handlerClick(user)}
        tooltip={user.blocked ? 'Desbloquear usuario' : 'Bloquear usuario'}
        tooltipOptions={{ position: 'top' }}
      />
    </>

  );
};

export default ButtonUserBlocked;
