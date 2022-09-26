import { useContext } from 'react';
import { Button } from 'primereact/button';

import { processError } from '../../../utils';
import { Professor } from '../../../interfaces';
import { ToastContext } from '../../../context';

import { useUpdateActiveMutation } from '../../../redux/professor/professor.api';

interface Props {
    professor: Professor;
}

export const ButtonProfessorActive = ({ professor }: Props) => {
  const [ updateBlocked, { isLoading }] = useUpdateActiveMutation();

  const { showSuccess, showError } = useContext(ToastContext);

  const handlerClick = async ({ id, active }: Professor) => {
    try {
      await updateBlocked({ id, active: !active }).unwrap();
      showSuccess({ detail: 'Se cambio el status con éxito' });
    } catch (error) {
      processError({ error, showError });
    }
  };

  return (
    <Button
      icon={`pi pi-${professor.active ? 'lock-open' : 'lock'}`}
      loading={isLoading}
      tooltip="Cambiar Estatus"
      tooltipOptions={{ position: 'top' }}
      className={`p-button-sm p-button-raised ${professor.active ? 'p-button-success' : 'p-button-danger'} `}
      onClick={() => handlerClick(professor)}
    />
  );
};

export default ButtonProfessorActive;
