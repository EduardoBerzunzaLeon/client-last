import { useContext } from 'react';
import { useNavigate } from 'react-router-dom';

import { Button } from 'primereact/button';

import { Professor } from '../../../../../interfaces/api';
import { ProfessorContext } from '../../context/professorContext';

export const ActionsBody = ({ professor }: { professor: Professor }) => {
  const { setProfessorSelected, setDisplayModal } = useContext(ProfessorContext);
  const { id } = professor;

  const navigate = useNavigate();

  return (
    <>
      <Button icon="pi pi-eye" className="p-button-sm p-button-raised p-button-primary mr-1" onClick={() => navigate(`/admin/users/${id}`)} />
      <Button
        icon="pi pi-pencil"
        className="p-button-sm p-button-raised p-button-primary mr-1"
        onClick={() => {
          setProfessorSelected(professor);
          setDisplayModal(true);
        }}
      />
    </>
  );
};

export const ActionsBodyTemplate = (professor: Professor) => <ActionsBody professor={professor} />;

export default {
  ActionsBody,
  ActionsBodyTemplate,
};
