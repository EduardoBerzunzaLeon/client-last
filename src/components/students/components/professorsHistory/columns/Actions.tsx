import { useContext } from 'react';

import { Button } from 'primereact/button';
import { confirmDialog } from 'primereact/confirmdialog';
import { Toast } from 'primereact/toast';

import { processError } from '../../../../../utils';
import { ProfessorInHistory } from '../../../../../interfaces';
import { ProfessorsHistoryContext } from '../context/professorsHistoryContext';
import { StudentContext } from '../../../context/studentContext';

import { useDeleteProfessorInHistoryMutation } from '../../../../../redux/student/student.api';
import { useToast } from '../../../../../hooks';

export const ActionsBody = ({ professorInHistory }: { professorInHistory: ProfessorInHistory }) => {
  const { studentSelected } = useContext(StudentContext);
  const { setProfessorSelected } = useContext(ProfessorsHistoryContext);

  const [ deleteSubject, { isLoading }] = useDeleteProfessorInHistoryMutation();
  const { toast, showSuccess, showError } = useToast();

  const { dischargeAt, id, professor } = professorInHistory;

  const accept = async () => {
    try {
      await deleteSubject({ userId: studentSelected?.id ?? '', professorHistoryId: id }).unwrap();
      setProfessorSelected(undefined);
      showSuccess({ detail: `El tutor ${professor.name.first} ${professor.name.last} ha sido desvinculado` });
    } catch (error) {
      processError({ error, showError });
    }
  };

  const handleDelete = () => {
    confirmDialog({
      message: '¿Estas seguro en desvincular este tutor?, el proceso es IRREVERSIBLE',
      header: 'Confirmación de desvinculación ',
      icon: 'pi pi-info-circle',
      acceptClassName: 'p-button-danger',
      accept,
    });
  };

  const handleUpdate = () => {
    setProfessorSelected(professorInHistory);
  };

  return (
    <>
      <Toast ref={toast} />
      <Button
        icon="pi pi-pencil"
        tooltip="Editar Asignación Tutor"
        tooltipOptions={{ position: 'top' }}
        className="p-button-sm p-button-raised p-button-primary mr-1"
        disabled={!!dischargeAt}
        onClick={handleUpdate}
      />
      <Button
        icon="pi pi-trash"
        tooltip="Eliminar Asignación de Tutor"
        tooltipOptions={{ position: 'top' }}
        className="p-button-sm p-button-raised p-button-danger mr-1"
        disabled={!!dischargeAt}
        onClick={handleDelete}
        loading={isLoading}
      />
    </>
  );
};

export const ActionsBodyTemplate = (
  professorInHistory: ProfessorInHistory,
) => <ActionsBody professorInHistory={professorInHistory} />;

export default {
  ActionsBody,
  ActionsBodyTemplate,
};
