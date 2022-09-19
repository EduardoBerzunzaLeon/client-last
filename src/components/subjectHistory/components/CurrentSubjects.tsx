import { Card } from 'primereact/card';
import { Column } from 'primereact/column';
import { DataTable } from 'primereact/datatable';
import { SubjectHistory } from '../../../interfaces/api';
import { ActionsBodyTemplate, StepBodyTemplate } from './columns';

interface Props {
    userId: string;
    currentSubjects: SubjectHistory[]
}

export const CurrentSubjects = ({ userId, currentSubjects }: Props) => {
  console.log(userId, currentSubjects);
  return (
    <Card title="Materias del Semestre Actual">
      <DataTable value={currentSubjects} responsiveLayout="scroll">
        <Column field="lastPhase.semester" header="Semestre" />
        <Column field="subject.name" header="Materia" />
        <Column
          field="step"
          header="Intento"
          body={StepBodyTemplate}
        />
        <Column field="lastPhase.phaseStatus" header="Estatus" />
        <Column
          body={ActionsBodyTemplate}
          exportable={false}
        />
      </DataTable>
    </Card>
  );
};
export default CurrentSubjects;
