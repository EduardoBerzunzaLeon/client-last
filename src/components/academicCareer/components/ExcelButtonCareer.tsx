import { useGetAcademicCareerForExcelQuery } from '../../../redux/academicCareer/academicCareer.api';
import { ExcelButton } from '../../ui';

const headers = [[
  'Materia',
  'En riesgo',
  'Semestre',
  'Primera Fase',
  'Modo Primera Fase',
  'Segunda Fase',
  'Modo Segunda Fase',
  'Tercera Fase',
  'Modo Tercera Fase',
]];

interface Props {
    userId: string
}

export const ExcelButtonCareer = ({ userId }: Props) => (
  <ExcelButton
    hookRTK={useGetAcademicCareerForExcelQuery}
    headers={headers}
    fileName="trayectoria_academica"
    label="Descargar Trayectoria"
    hookParams={userId}
  />
);

export default ExcelButtonCareer;
