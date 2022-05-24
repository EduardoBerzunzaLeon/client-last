import { Button } from 'primereact/button';
import { Toast } from 'primereact/toast';

import { processError } from '../../../../utils/forms/handlerFormErrors';
import { Professor } from '../../../../interfaces/api';

import { useToast } from '../../../../hooks/useToast';
import { useUpdateActiveMutation } from '../../../../redux/professor/professor.api';

interface Props {
    professor: Professor;
}

export const ButtonProfessorActive = ({ professor }: Props) => {
  const [ updateBlocked, { isLoading }] = useUpdateActiveMutation();

  const { toast, showError, showSuccess } = useToast();

  const handlerClick = async ({ id, active }: Professor) => {
    try {
      await updateBlocked({ id, active: !active }).unwrap();
      showSuccess({ detail: 'Se cambio el status con éxito' });
    } catch (error) {
      processError({ error, showError });
    }
  };

  return (
    <>
      <Toast ref={toast} />
      <Button
        icon={`pi pi-${professor.active ? 'lock-open' : 'lock'}`}
        loading={isLoading}
        tooltip="Cambiar Estatus"
        tooltipOptions={{ position: 'top' }}
        className={`p-button-sm p-button-raised ${professor.active ? 'p-button-success' : 'p-button-danger'} `}
        onClick={() => handlerClick(professor)}
      />
    </>

  );
};

export default ButtonProfessorActive;
