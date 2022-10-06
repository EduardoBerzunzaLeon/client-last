import { useGetAcademicCareerForExcelQuery } from '../../../redux/academicCareer/academicCareer.api';
import { ExcelButton } from '../../ui';

const headers = [[
  'Materia',
  'En riesgo',
  'Semestre',
  'Primera Fase',
  'Segunda Fase',
  'Tercera Fase',
]];

interface Props {
    userId: string
}

export const ExcelButtonCareer = ({ userId }: Props) => (
  <ExcelButton
    hookRTK={useGetAcademicCareerForExcelQuery}
    headers={headers}
    fileName="trayectoria_academica"
    label="Descargar Trayectoria Academica"
    hookParams={userId}
  />
);

export default ExcelButtonCareer;
