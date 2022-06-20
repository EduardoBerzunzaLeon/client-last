import { Button } from 'primereact/button';

export const ActionsBody = () => (
  <>
    <Button
      icon="pi pi-pencil"
      tooltip="Editar Asignación Tutor"
      tooltipOptions={{ position: 'top' }}
      className="p-button-sm p-button-raised p-button-primary mr-1"
    />
    <Button
      icon="pi pi-trash"
      tooltip="Eliminar Asignación de Tutor"
      tooltipOptions={{ position: 'top' }}
      className="p-button-sm p-button-raised p-button-danger mr-1"
    />
  </>
);

export default ActionsBody;
