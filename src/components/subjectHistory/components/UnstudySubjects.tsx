import { Card } from 'primereact/card';
import { Column } from 'primereact/column';
import { DataTable } from 'primereact/datatable';

import { CoreBodyTemplate } from '../../subjects';
import { SpinnerRTK } from '../../ui';

import { useGetUnstudySubjectQuery } from '../../../redux/subjectHistory/subjectHistory.api';

interface Props {
    userId: string
}

export const UnstudySubjects = ({ userId }: Props) => {
  const {
    data, isError, error, isLoading,
  } = useGetUnstudySubjectQuery(userId);

  return (
    <SpinnerRTK
      error={error}
      data={data}
      isLoading={isLoading}
      isError={isError}
    >
      {({ data: dataSend }) => (
        <Card title="Materias aun no cursadas">
          <DataTable
            value={dataSend}
            responsiveLayout="scroll"
            paginator
            rows={10}
          >
            <Column field="semester" header="Semestre" />
            <Column field="name" header="Materia" />
            <Column field="credit" header="Créditos" />
            <Column
              field="core"
              header="Núcleo"
              body={CoreBodyTemplate}
            />
          </DataTable>
        </Card>
      )}
    </SpinnerRTK>
  );
};

export default UnstudySubjects;
