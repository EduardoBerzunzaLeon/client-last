import { useContext } from 'react';

import { confirmDialog } from 'primereact/confirmdialog';
import { Button } from 'primereact/button';

import { Toast } from 'primereact/toast';
import { SubjectContext } from '../../context/subjectContext';
import { Subject } from '../../../../../interfaces/api';
import { useDeleteSubjectMutation } from '../../../../../redux/subject/subject.api';
import { processError } from '../../../../../utils/forms/handlerFormErrors';
import { useToast } from '../../../../../hooks/useToast';

export const ActionsBody = ({ subject }: { subject: Subject }) => {
  const { setSubjectSelected, setDisplayModal, setIsOpenDetailModal } = useContext(SubjectContext);
  const [ deleteSubject, { isLoading }] = useDeleteSubjectMutation();

  // FIXME: Don´t destoy modal after table updated
  const { id } = subject;
  const { toast, showSuccess, showError } = useToast();

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
      <Toast ref={toast} />
      <Button
        icon="pi pi-eye"
        className="p-button-sm p-button-raised p-button-primary mr-1"
        onClick={handleViewDetail}
      />
      <Button
        icon="pi pi-pencil"
        className="p-button-sm p-button-raised p-button-primary mr-1"
        onClick={handleUpdate}
      />
      <Button
        icon="pi pi-trash"
        className="p-button-sm p-button-raised p-button-danger"
        onClick={handleDelete}
        loading={isLoading}
      />
    </>
  );
};

export const ActionsBodyTemplate = (subject: Subject) => <ActionsBody subject={subject} />;

export default {
  ActionsBody,
  ActionsBodyTemplate,
};
