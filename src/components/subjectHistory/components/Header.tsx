import { useContext } from 'react';
import { Button } from 'primereact/button';
import { SubjectHistoryContext } from '../context/subjectHistoryContext';

export const Header = () => {
  const {
    setDisplayModal,
  } = useContext(SubjectHistoryContext);

  const onClick = () => {
    setDisplayModal(true);
  };

  return (
    <div className="flex justify-content-between flex-wrap card-container">
      <h2 className="p-card-title font-bold">Materias del semestre actual</h2>
      <Button
        type="button"
        icon="pi pi-plus"
        label="Agregar Materia"
        className="p-button-outlined p-button-success m-2"
        onClick={onClick}
      />
    </div>
  );
};

export default Header;
