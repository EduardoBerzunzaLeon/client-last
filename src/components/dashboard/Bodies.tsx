import { useNavigate } from 'react-router-dom';
import { Button } from 'primereact/button';

import { TextImageBody } from '../datatable';
import { StudentsByField } from '../../interfaces';

export const ProfessorBodyTemplate = ({ user }: StudentsByField) => (
  <TextImageBody text={`${user.name.first} ${user.name.last}`} imageURL={user.avatar} />
);

const ActionsBody = ({ enrollment }: { enrollment: string }) => {
  const navigate = useNavigate();

  return (
    <Button
      icon="pi pi-eye"
      tooltip="Ver Alumno"
      tooltipOptions={{ position: 'top' }}
      className="p-button-sm p-button-raised p-button-primary mr-1"
      onClick={() => navigate('/admin/students/', { state: { enrollment }})}
    />
  );
};

export const ActionsBodyTemplate = (
  { enrollment }: StudentsByField,
) => <ActionsBody enrollment={enrollment} />;

export default {
  ActionsBodyTemplate,
  ProfessorBodyTemplate,
};
