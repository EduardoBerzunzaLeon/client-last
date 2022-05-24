import { ExcelButton } from '../../../../components/excelButton/ExcelButton';

import { useGetSubjectsForExcelQuery } from '../../../../redux/subject/subject.api';

const headers = [[ 'ID', 'Nombre', 'Semestre', 'Creado el', 'Deprecado', 'Materias Requeridas', 'Materias Correlativas', 'Creditos', 'Horas Practicas', 'Horas Teóricas', 'Horas Totales', ' Núcleo Academico' ]];

export const ExcelButtonSubjects = () => (
  <ExcelButton
    hookRTK={useGetSubjectsForExcelQuery}
    headers={headers}
  />
);

export default ExcelButtonSubjects;
