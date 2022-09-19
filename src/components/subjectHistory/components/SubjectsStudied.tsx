import { Card } from 'primereact/card';
import { Column } from 'primereact/column';
import { TreeTable } from 'primereact/treetable';

import { SpinnerRTK } from '../../ui';
import { StatusBodyTemplate, StepBodyTemplate } from './columns';

import { useGetSubjectStudiedQuery } from '../../../redux/subjectHistory/subjectHistory.api';

interface Props {
    userId: string
}

export const SubjectsStudied = ({ userId }: Props) => {
  const {
    data, isError, error, isLoading,
  } = useGetSubjectStudiedQuery(userId);

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
            rowClassName={(node) => ({ 'bg-purple-100': node.children })}
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
              body={StatusBodyTemplate}
              filter
              filterPlaceholder="Filtrar por estatus"
              style={{ width: '14rem' }}
            />
            <Column
              field="step"
              header="Intento"
              body={StepBodyTemplate}
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
