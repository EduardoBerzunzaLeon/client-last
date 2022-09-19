import { Card } from 'primereact/card';
import { Column } from 'primereact/column';
import { DataTable } from 'primereact/datatable';

import { SubjectHistory } from '../../../interfaces/api';
import { ActionsBodyTemplate, StepBody } from './columns';
import { Header } from './Header';

interface Props {
    currentSubjects: SubjectHistory[]
}

export const CurrentSubjects = ({ currentSubjects }: Props) => (
  <Card>
    <Header />
    <DataTable value={currentSubjects} responsiveLayout="scroll">
      <Column field="lastPhase.semester" header="Semestre" />
      <Column field="subject.name" header="Materia" />
      <Column
        field="step"
        header="Intento"
        body={StepBody}
      />
      <Column field="lastPhase.phaseStatus" header="Estatus" />
      <Column
        body={ActionsBodyTemplate}
        exportable={false}
      />
    </DataTable>
  </Card>
);
export default CurrentSubjects;
