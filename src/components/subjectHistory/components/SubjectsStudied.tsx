import { Card } from 'primereact/card';
import { Column } from 'primereact/column';
// import { DataTable } from 'primereact/datatable';
import { TreeTable } from 'primereact/treetable';
import { Badge, SpinnerRTK } from '../../ui';

import { useGetSubjectStudiedQuery } from '../../../redux/subjectHistory/subjectHistory.api';
// import { StepBodyTemplate } from './columns';
import { StepBodyTemplate } from './columns/Step';
import { SubjectsStudied as SubjectStudiedInterface } from '../../../interfaces';

interface Props {
    userId: string
}

const StatusTemplate = (data: SubjectStudiedInterface) => {
  // eslint-disable-next-line react/destructuring-assignment
  if (data?.data?.status) {
    return (
      <Badge
        // eslint-disable-next-line react/destructuring-assignment
        text={data.data.status}
        matchObject={{
          cursando: 'info',
          reprobado: 'danger',
          aprobado: 'success',
        }}
        // eslint-disable-next-line react/destructuring-assignment
        match={data.data.status}
      />
    );
  }
  return undefined;
};

export const SubjectsStudied = ({ userId }: Props) => {
  const {
    data, isError, error, isLoading,
  } = useGetSubjectStudiedQuery(userId);

  // eslint-disable-next-line @typescript-eslint/no-unused-vars, no-shadow
  const actionTemplate = (data: SubjectStudiedInterface) => {
    if (data?.data?.step) {
      return (<StepBodyTemplate step={Number(data.data.step)} />);
    }
    return undefined;
  };

  return (
    <SpinnerRTK
      error={error}
      data={data}
      isLoading={isLoading}
      isError={isError}
    >
      {({ data: dataSend }) => (
        <Card title="Materias cursadas">
          <TreeTable
            value={dataSend}
            scrollable
            rowClassName={(node) => ({ 'bg-purple-50': node.children })}
            resizableColumns
            columnResizeMode="fit"
            showGridlines
          >
            <Column
              field="subject"
              header="Materia"
              expander
              filter
              filterPlaceholder="Filtrar por materia"
              style={{ width: '14rem' }}
            />
            <Column
              field="status"
              header="Estatus"
              body={StatusTemplate}
              filter
              filterPlaceholder="Filtrar por estatus"
              style={{ width: '14rem' }}
            />
            <Column
              field="step"
              header="Intento"
              body={actionTemplate}
              filter
              filterPlaceholder="Filtrar por intento"
              style={{ width: '14rem' }}
            />
          </TreeTable>
        </Card>
      )}
    </SpinnerRTK>
  );
};

export default SubjectsStudied;
