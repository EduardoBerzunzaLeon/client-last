import { Card } from 'primereact/card';
import { Column } from 'primereact/column';
import { DataTable } from 'primereact/datatable';
import { useLazyParams } from '../../hooks';

import { useGetStudentsByFieldQuery } from '../../redux/student/student.api';

import { InChannellingBody } from '../students';
import { SpinnerRTK } from '../ui';
import { ActionsBodyTemplate, ProfessorBodyTemplate } from './Bodies';

export const InChanellingStudents = () => {
  const {
    onPage,
    lazyParams,
    paginatorURL,
  } = useLazyParams({}, 'students/chanelling');

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
        <Card title="Alumnos en canalización">
          <DataTable
            dataKey="id"
            value={dataSend}
            lazy
            rows={lazyParams.rows}
            loading={isFetching}
            onPage={onPage}
            paginator
            responsiveLayout="scroll"
            emptyMessage="Sin Alumnos en canalización"
            totalRecords={total}
          >
            <Column field="enrollment" header="Matricula" />
            <Column
              field="user.name.first"
              header="Alumno"
              body={ProfessorBodyTemplate}
            />
            <Column field="currentSemester" header="Semestre" />
            <Column field="inChanelling" header="En Canalización" body={InChannellingBody} />
            <Column body={ActionsBodyTemplate} />
          </DataTable>
        </Card>
      )}

    </SpinnerRTK>
  );
};

export default InChanellingStudents;
