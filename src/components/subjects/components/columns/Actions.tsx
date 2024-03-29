import { useContext } from 'react';

import { Button } from 'primereact/button';
import { confirmDialog } from 'primereact/confirmdialog';

import { PermissionsGate } from '../../../authorization/PermissionGate';
import { processError } from '../../../../utils';
import { Subject } from '../../../../interfaces';
import { SubjectContext } from '../../context/subjectContext';

import { useDeleteSubjectMutation } from '../../../../redux/subject/subject.api';
import { ToastContext } from '../../../../context';

export const ActionsBody = ({ subject }: { subject: Subject }) => {
  const { setSubjectSelected, setDisplayModal, setIsOpenDetailModal } = useContext(SubjectContext);
  const [ deleteSubject, { isLoading }] = useDeleteSubjectMutation();
  const { showSuccess, showError } = useContext(ToastContext);

  const { id } = subject;

  const accept = async () => {
    try {
      await deleteSubject(id).unwrap();
      showSuccess({ detail: `La materia ${subject.name} ha sido eliminada` });
    } catch (error) {
      processError({ error, showError });
    }
  };

  const handleViewDetail = () => {
    setIsOpenDetailModal(true);
    setSubjectSelected(subject);
  };

  const handleUpdate = () => {
    setSubjectSelected(subject);
    setDisplayModal(true);
  };

  const handleDelete = () => {
    confirmDialog({
      message: '¿Estas seguro en eliminar esta materia?, el proceso no es REVERSIBLE',
      header: 'Confirmación de eliminación',
      icon: 'pi pi-info-circle',
      acceptClassName: 'p-button-danger',
      accept,
    });
  };

  return (
    <>
      <Button
        icon="pi pi-eye"
        tooltip="Ver Materia"
        tooltipOptions={{ position: 'top' }}
        className="p-button-sm p-button-raised p-button-primary mr-1"
        onClick={handleViewDetail}
      />
      <PermissionsGate
        module="subject"
        permission="canUpdate"
      >
        <Button
          icon="pi pi-pencil"
          tooltip="Editar Materia"
          tooltipOptions={{ position: 'top' }}
          className="p-button-sm p-button-raised p-button-primary mr-1"
          onClick={handleUpdate}
        />
      </PermissionsGate>
      <PermissionsGate
        module="subject"
        permission="canDelete"
      >
        <Button
          icon="pi pi-trash"
          tooltip="Eliminar Materia"
          tooltipOptions={{ position: 'top' }}
          className="p-button-sm p-button-raised p-button-danger"
          onClick={handleDelete}
          loading={isLoading}
        />
      </PermissionsGate>
    </>
  );
};

export const ActionsBodyTemplate = (subject: Subject) => <ActionsBody subject={subject} />;

export default {
  ActionsBody,
  ActionsBodyTemplate,
};
