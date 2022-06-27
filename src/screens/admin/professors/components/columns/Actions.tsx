import { useContext } from 'react';
import { useNavigate } from 'react-router-dom';

import { Button } from 'primereact/button';
// import { Tooltip } from 'primereact/tooltip';

import { Professor } from '../../../../../interfaces';
import { ProfessorContext } from '../../context/professorContext';
import { ButtonProfessorActive } from '../ButtonProfessorActive';
import { PermissionsGate } from '../../../../../components/authorization/PermissionGate';

export const ActionsBody = ({ professor }: { professor: Professor }) => {
  const {
    setProfessorSelected,
    setDisplayModal,
    setDisplayCoursesModal,
  } = useContext(ProfessorContext);
  const { id } = professor;

  const navigate = useNavigate();

  const handleUpdate = () => {
    setProfessorSelected(professor);
    setDisplayModal(true);
  };

  const handleUpdateCourse = () => {
    setProfessorSelected(professor);
    setDisplayCoursesModal(true);
  };

  return (
    <>
      <Button
        icon="pi pi-eye"
        tooltip="Ver Tutor"
        tooltipOptions={{ position: 'top' }}
        className="p-button-sm p-button-raised p-button-primary mr-1"
        onClick={() => navigate(`/admin/users/${id}`, { state: { root: 'professors' }})}
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
      <PermissionsGate
        module="course"
        permission="canUpdate"
      >
        <Button
          icon="pi pi-plus"
          className="p-button-sm p-button-raised p-button-primary mr-1"
          tooltip="Editar Curso del Tutor"
          tooltipOptions={{ position: 'top' }}
          onClick={handleUpdateCourse}
        />
      </PermissionsGate>
      <PermissionsGate
        module="professor"
        permission="canDelete"
      >
        <ButtonProfessorActive professor={professor} />
      </PermissionsGate>
    </>
  );
};

export const ActionsBodyTemplate = (professor: Professor) => <ActionsBody professor={professor} />;

export default {
  ActionsBody,
  ActionsBodyTemplate,
};
