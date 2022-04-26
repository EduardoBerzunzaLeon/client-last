import classNames from 'classnames';
import { Button } from 'primereact/button';
import { Toast } from 'primereact/toast';
import useToast from '../../../../hooks/useToast';
import { User } from '../../../../interfaces/api';
import { useUpdateBlockedUserAdminMutation } from '../../../../redux/user/user.api';
import { processError } from '../../../../utils/form/handlerErrorsForms';

interface Props {
    user: User;
    isUserLogged: boolean;
}

function ButtonBlocked({ user, isUserLogged }: Props) {
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
      />
    </>

  );
}

export default ButtonBlocked;
