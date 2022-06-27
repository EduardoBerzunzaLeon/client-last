import { ExcelButton } from '../../ui';
import { useGetProfessorsForExcelQuery } from '../../../redux/professor/professor.api';

const headers = [[ 'ID', 'Nombre', 'Correo', 'Genero', 'Activo', 'Materias Impartidas', 'Cursos' ]];

export const ExcelButtonProfessors = () => (
  <ExcelButton
    hookRTK={useGetProfessorsForExcelQuery}
    headers={headers}
    fileName="maestros"
  />
);

export default ExcelButtonProfessors;
