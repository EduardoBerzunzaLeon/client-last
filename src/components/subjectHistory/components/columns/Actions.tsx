import { memo, useContext } from 'react';

import { Button } from 'primereact/button';
import { confirmDialog } from 'primereact/confirmdialog';
import { Toast } from 'primereact/toast';

import { PermissionsGate } from '../../../authorization/PermissionGate';
import { processError } from '../../../../utils';
import { SubjectHistory } from '../../../../interfaces';
import { SubjectHistoryContext } from '../../context/subjectHistoryContext';

import { useDeleteSubjectPhaseMutation } from '../../../../redux/subjectHistory/subjectHistory.api';
import { useToast } from '../../../../hooks';

const ActionsBody = memo(({ subjectHistory }: { subjectHistory: SubjectHistory }) => {
  const { setDisplayModal, setPhaseOfSubjectSelected } = useContext(SubjectHistoryContext);
  const [ deletePhase, { isLoading }] = useDeleteSubjectPhaseMutation();
  const { toast, showSuccess, showError } = useToast();
  const { lastPhase, subject } = subjectHistory;

  const accept = async () => {
    try {
      await deletePhase(lastPhase._id).unwrap();
      showSuccess({ detail: `La materia ${subject.name} ha sido eliminada` });
    } catch (error) {
      processError({ error, showError });
    }
  };

  const handleUpdate = () => {
    setDisplayModal(true);
    setPhaseOfSubjectSelected(subjectHistory);
  };

  const handleDelete = () => {
    confirmDialog({
      message: '¿Estas seguro en eliminar esta materia en la carga actual?, el proceso es IRREVERSIBLE',
      header: 'Confirmación de eliminación',
      icon: 'pi pi-info-circle',
      acceptClassName: 'p-button-danger',
      accept,
    });
  };

  return (
    <>
      <Toast ref={toast} />
      <PermissionsGate
        module="student"
        permission="canUpdate"
      >
        <Button
          icon="pi pi-pencil"
          className="p-button-sm p-button-raised p-button-primary mr-1"
          tooltip="Editar Material Actual"
          tooltipOptions={{ position: 'top' }}
          onClick={handleUpdate}
        />
      </PermissionsGate>
      <PermissionsGate
        module="student"
        permission="canUpdate"
      >
        <Button
          icon="pi pi-trash"
          className="p-button-sm p-button-raised p-button-danger mr-1"
          tooltip="Eliminar Materia Actual"
          tooltipOptions={{ position: 'top' }}
          onClick={handleDelete}
          loading={isLoading}
        />
      </PermissionsGate>
    </>
  );
});

export const ActionsBodyTemplate = (
  subjectHistory: SubjectHistory,
) => <ActionsBody subjectHistory={subjectHistory} />;

export default {
  ActionsBody,
  ActionsBodyTemplate,
};
