import {
  DynamicColumn,
  FileErrorsTable, PhaseCard, SchoolYearStepForm,
} from '../../../components/schoolYear';
import { HeaderAdmin, SpinnerRTK } from '../../../components/ui';

import { useGetSchoolYearQuery } from '../../../redux/schoolYear/schoolYear.api';

const columns: DynamicColumn[] = [
  { field: 'enrollment', header: 'Matricula' },
  { field: 'subject', header: 'Materia' },
  { field: 'status', header: 'Estatus' },
  { field: 'error', header: 'Error' },
];

export const SchoolYearScreen = () => {
  const {
    data, isError, error, isLoading,
  } = useGetSchoolYearQuery();

  return (
    <SpinnerRTK
      error={error}
      data={data}
      isLoading={isLoading}
      isError={isError}
    >
      {({ data: dataSend }) => (
        <>
          <HeaderAdmin
            position="schoolYear"
            title={`Ciclo Escolar ${dataSend.period.start} - ${dataSend.period.end}`}
            hasBreadcumbs
          />
          <div className="grid">
            <div className="col-12 md:col-6">
              <PhaseCard {...dataSend.firstPhase} title="Primera Fase" />
            </div>
            <div className="col-12 md:col-6">
              <PhaseCard {...dataSend.secondPhase} title="Segunda Fase" />
            </div>
            <div className="col-12 md:col-6 lg:col-4">
              <FileErrorsTable
                {...dataSend.period}
                status="no generado"
                endpointName="currentSubjects"
                title="Error en el archivo de Materias Nuevas"
              />
            </div>
            <div className="col-12 md:col-6 lg:col-4">
              <FileErrorsTable
                {...dataSend.period}
                status="no generado"
                endpointName="failedSubjects"
                title="Error en el archivo de Materias Reprobadas"
              />
            </div>
            <div className="col-12 md:col-6 lg:col-4">
              <FileErrorsTable
                {...dataSend.period}
                status="no generado"
                endpointName="intersemestralSubjects"
                title="Error en el archivo de intersemestrales"
                columns={columns}
              />
            </div>
            <div className="col-12">
              <SchoolYearStepForm />
            </div>
          </div>
        </>

      )}
    </SpinnerRTK>
  );
};

export default SchoolYearScreen;
