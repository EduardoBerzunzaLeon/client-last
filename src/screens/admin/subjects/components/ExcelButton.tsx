import { Button } from 'primereact/button';
import { useEffect, useState } from 'react';
import { useGetSubjectsForExcelQuery } from '../../../../redux/subject/subject.api';
import { exportExcel } from '../../../../utils/exports/exportExcel';

const headers = [[ 'ID', 'Nombre', 'Semestre', 'Deprecado', 'Materias Requeridas', 'Materias Correlativas', 'Creditos', 'Horas Practicas', 'Horas Teóricas', 'Horas Totales', ' Núcleo Academico' ]];

export const ExcelButton = () => {
  const [ skip, setSkip ] = useState(true);
  const [ isLoading, setIsLoading ] = useState(false);
  const { data } = useGetSubjectsForExcelQuery(null, { skip });

  useEffect(() => {
    if (data && isLoading) {
      const finished = exportExcel(data.data, 'materias', headers);
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

export default ExcelButton;
