import { Button } from 'primereact/button';
import { confirmDialog } from 'primereact/confirmdialog';
import { Toast } from 'primereact/toast';
import { useContext } from 'react';
import { useToast } from '../../../../../../hooks/useToast';
import { ProfessorInHistory } from '../../../../../../interfaces/api';
import { useDeleteProfessorInHistoryMutation } from '../../../../../../redux/student/student.api';
import { processError } from '../../../../../../utils/forms/handlerFormErrors';
import { StudentContext } from '../../../context/studentContext';

export const ActionsBody = ({ professorInHistory }: { professorInHistory: ProfessorInHistory }) => {
  const [ deleteSubject, { isLoading }] = useDeleteProfessorInHistoryMutation();
  const {
    studentSelected,
  } = useContext(StudentContext);

  const { dischargeAt, id, professor } = professorInHistory;
  const { toast, showSuccess, showError } = useToast();

  const accept = async () => {
    try {
      await deleteSubject({ userId: studentSelected?.id ?? '', professorHistoryId: id }).unwrap();
      showSuccess({ detail: `El tutor ${professor.name.first} ${professor.name.last} ha sido desvinculado` });
    } catch (error) {
      processError({ error, showError });
    }
  };

  const handleDelete = () => {
    confirmDialog({
      message: '¿Estas seguro en disvincular este tutor?, el proceso no es REVERSIBLE',
      header: 'Confirmación de eliminación',
      icon: 'pi pi-info-circle',
      acceptClassName: 'p-button-danger',
      accept,
    });
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
