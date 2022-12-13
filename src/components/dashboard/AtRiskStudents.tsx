import { Card } from 'primereact/card';
import { Column } from 'primereact/column';
import { DataTable } from 'primereact/datatable';

import { useLazyParams } from '../../hooks';
import { useGetStudentsByFieldQuery } from '../../redux/student/student.api';
import { AtRiskBody } from '../students';
import { SpinnerRTK } from '../ui';
import { ActionsBodyTemplate, ProfessorBodyTemplate } from './Bodies';

export const AtRiskStudents = () => {
  const {
    onPage,
    lazyParams,
    paginatorURL,
  } = useLazyParams({}, 'students/risk');

  const {
    data, isError, error, isLoading, isFetching,
  } = useGetStudentsByFieldQuery(paginatorURL);

  return (
    <SpinnerRTK
      data={data}
      error={error}
      isError={isError}
      isLoading={isLoading}
    >
      {({ data: dataSend, total }) => (
        <Card title="Alumnos en riesgo">
          <DataTable
            dataKey="id"
            value={dataSend}
            lazy
            rows={lazyParams.rows}
            loading={isFetching}
            onPage={onPage}
            paginator
            responsiveLayout="scroll"
            emptyMessage="Sin Alumnos en riesgo"
            totalRecords={total}
          >
            <Column field="enrollment" header="Matricula" />
            <Column
              field="user.name.first"
              header="Alumno"
              body={ProfessorBodyTemplate}
            />
            <Column field="currentSemester" header="Semestre" />
            <Column field="atRisk" header="En Riesgo" body={AtRiskBody} />
            <Column body={ActionsBodyTemplate} />
          </DataTable>
        </Card>
      )}

    </SpinnerRTK>
  );
};

export default AtRiskStudents;
