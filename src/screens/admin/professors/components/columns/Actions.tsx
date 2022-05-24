import { useContext } from 'react';
import { useNavigate } from 'react-router-dom';

import { Button } from 'primereact/button';
// import { Tooltip } from 'primereact/tooltip';

import { Professor } from '../../../../../interfaces/api';
import { ProfessorContext } from '../../context/professorContext';
import { ButtonProfessorActive } from '../ButtonProfessorActive';

export const ActionsBody = ({ professor }: { professor: Professor }) => {
  const {
    setProfessorSelected,
    setDisplayModal,
    setDisplayCoursesModal,
  } = useContext(ProfessorContext);
  const { id } = professor;

  const navigate = useNavigate();

  return (
    <>
      <Button
        icon="pi pi-eye"
        tooltip="Ver Tutor"
        tooltipOptions={{ position: 'top' }}
        className="p-button-sm p-button-raised p-button-primary mr-1"
        onClick={() => navigate(`/admin/professors/${id}`)}
      />
      <Button
        icon="pi pi-pencil"
        className="p-button-sm p-button-raised p-button-primary mr-1"
        tooltip="Editar Tutor"
        tooltipOptions={{ position: 'top' }}
        onClick={() => {
          setProfessorSelected(professor);
          setDisplayModal(true);
        }}
      />
      <Button
        icon="pi pi-plus"
        className="p-button-sm p-button-raised p-button-primary mr-1"
        tooltip="Editar Curso del Tutor"
        tooltipOptions={{ position: 'top' }}
        onClick={() => {
          setProfessorSelected(professor);
          setDisplayCoursesModal(true);
        }}
      />
      <ButtonProfessorActive professor={professor} />
    </>
  );
};

export const ActionsBodyTemplate = (professor: Professor) => <ActionsBody professor={professor} />;

export default {
  ActionsBody,
  ActionsBodyTemplate,
};
