import { useContext } from 'react';

import { confirmDialog } from 'primereact/confirmdialog';
import { Button } from 'primereact/button';

import { Course } from '../../../../interfaces';
import { processError } from '../../../../utils';
import { ToastContext } from '../../../../context';

import { useDeleteCourseMutation } from '../../../../redux/course/course.api';

export const ActionsCourseBody = ({ course }: { course: Course }) => {
  const [ deleteCourse, { isLoading }] = useDeleteCourseMutation();

  const { id } = course;
  const { showSuccess, showError } = useContext(ToastContext);

  const accept = async () => {
    try {
      await deleteCourse(id).unwrap();
      showSuccess({ detail: `La materia ${course.name} ha sido eliminada` });
    } catch (error) {
      processError({ error, showError });
    }
  };

  const handleDelete = () => {
    confirmDialog({
      message: '¿Estas seguro en eliminar este curso?, el proceso no es REVERSIBLE',
      header: 'Confirmación de eliminación',
      icon: 'pi pi-info-circle',
      acceptClassName: 'p-button-danger',
      accept,
    });
  };

  return (
    <Button
      icon="pi pi-trash"
      className="p-button-sm p-button-raised p-button-danger"
      onClick={handleDelete}
      loading={isLoading}
    />
  );
};

export const ActionsCoursesBodyTemplate = (course: Course) => <ActionsCourseBody course={course} />;

export const ImpartedAtBodyTemplate = ({ impartedAt }: Course) => (
  <>
    {impartedAt.toString().slice(0, 10)}
  </>
);

export default {
  ActionsCourseBody,
  ActionsCoursesBodyTemplate,
  ImpartedAtBodyTemplate,
};
