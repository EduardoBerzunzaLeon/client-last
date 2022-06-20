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
    setDisplayProfessorsHistoryModal,
  } = useContext(StudentContext);

  const { id } = student;

  const navigate = useNavigate();

  const handleUpdate = () => {
    setStudentSelected(student);
    setDisplayModal(true);
  };

  const handleShowProfessorsHistory = () => {
    setStudentSelected(student);
    setDisplayProfessorsHistoryModal(true);
  };

  return (
    <>
      <Button
        icon="pi pi-eye"
        tooltip="Ver Alumno"
        tooltipOptions={{ position: 'top' }}
        className="p-button-sm p-button-raised p-button-primary mr-1"
        onClick={() => navigate(`/admin/users/${id}`, { state: { root: 'students' }})}
      />
      <PermissionsGate
        module="student"
        permission="canUpdate"
      >
        <>
          <Button
            icon="pi pi-pencil"
            className="p-button-sm p-button-raised p-button-primary mr-1"
            tooltip="Editar Alumno"
            tooltipOptions={{ position: 'top' }}
            onClick={handleUpdate}
          />
          <Button
            icon="pi pi-history"
            className="p-button-sm p-button-raised p-button-primary mr-1"
            tooltip="Ver Historial de Tutores"
            tooltipOptions={{ position: 'top' }}
            onClick={handleShowProfessorsHistory}
          />
        </>

      </PermissionsGate>
    </>
  );
};

export const ActionsBodyTemplate = (student: StudentResume) => <ActionsBody student={student} />;

export default {
  ActionsBody,
  ActionsBodyTemplate,
};
