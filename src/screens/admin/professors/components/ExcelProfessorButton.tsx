import { useEffect, useState } from 'react';

import { Button } from 'primereact/button';

import { exportExcel } from '../../../../utils/exports/exportExcel';
import { useGetProfessorsForExcelQuery } from '../../../../redux/professor/professor.api';

const headers = [[ 'ID', 'Nombre', 'Correo', 'Genero', 'Activo', 'Creado el', 'Materias Impartidas', 'Cursos' ]];

export const ExcelProfessorButton = () => {
  const [ skip, setSkip ] = useState(true);
  const [ isLoading, setIsLoading ] = useState(false);
  const { data } = useGetProfessorsForExcelQuery(null, { skip });

  useEffect(() => {
    if (data && isLoading) {
      const finished = exportExcel(data.data, 'tutores', headers);
      if (finished) {
        setIsLoading(false);
      }
    }
  }, [ data, isLoading ]);

  const handleClick = () => {
    if (skip) {
      setSkip(false);
    }
    setIsLoading(true);
  };

  return (
    <Button
      type="button"
      icon="pi pi-file-excel"
      label="Exportar Excel"
      className="p-button p-button-success m-2"
      loading={isLoading}
      onClick={handleClick}
    />
  );
};

export default ExcelProfessorButton;
