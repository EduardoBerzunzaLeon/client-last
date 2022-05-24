import { ExcelButton } from '../../../../components/excelButton/ExcelButton';

import { useGetProfessorsForExcelQuery } from '../../../../redux/professor/professor.api';

const headers = [[ 'ID', 'Nombre', 'Correo', 'Genero', 'Activo', 'Creado el', 'Materias Impartidas', 'Cursos' ]];

export const ExcelButtonProfessors = () => (
  <ExcelButton
    hookRTK={useGetProfessorsForExcelQuery}
    headers={headers}
  />
);

export default ExcelButtonProfessors;
