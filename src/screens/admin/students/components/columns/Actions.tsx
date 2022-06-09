import { useContext } from 'react';
import { useNavigate } from 'react-router-dom';

import { Button } from 'primereact/button';

import { StudentResume } from '../../../../../interfaces/api';
import { PermissionsGate } from '../../../../../components/authorization/PermissionGate';
import { StudentContext } from '../../context/studentContext';

export const ActionsBody = ({ student }: { student: StudentResume }) => {
  const {
    setStudentSelected,
    setDisplayModal,
  } = useContext(StudentContext);

  const { id } = student;

  const navigate = useNavigate();

  const handleUpdate = () => {
    setStudentSelected(student);
    setDisplayModal(true);
  };

  return (
    <>
      <Button
        icon="pi pi-eye"
        tooltip="Ver Tutor"
        tooltipOptions={{ position: 'top' }}
        className="p-button-sm p-button-raised p-button-primary mr-1"
        onClick={() => navigate(`/admin/users/${id}`, { state: { root: 'students' }})}
      />
      <PermissionsGate
        module="professor"
        permission="canUpdate"
      >
        <Button
          icon="pi pi-pencil"
          className="p-button-sm p-button-raised p-button-primary mr-1"
          tooltip="Editar Tutor"
          tooltipOptions={{ position: 'top' }}
          onClick={handleUpdate}
        />
      </PermissionsGate>
    </>
  );
};

export const ActionsBodyTemplate = (student: StudentResume) => <ActionsBody student={student} />;

export default {
  ActionsBody,
  ActionsBodyTemplate,
};
