import { ExcelButton } from '../../ui';
import { useGetStudentsByExcelQuery } from '../../../redux/student/student.api';

const headers = [[
  'Nombre',
  'Correo Electronico',
  'Sexo',
  'Nombre del Tutor',
  'En riesgo',
  'En Canalizacion',
  'matricula',
  'Estatus',
  'Semestre Actual',
  'Grupo',
]];

export const ExcelButtonStudents = ({ paginatorURL }: { paginatorURL: string }) => {
  const addExcelURL: string = paginatorURL.replace('students', 'students/excel');

  return (
    <ExcelButton
      hookRTK={useGetStudentsByExcelQuery}
      headers={headers}
      fileName="alumnos"
      hookParams={addExcelURL}
    />
  );
};

export default ExcelButtonStudents;
