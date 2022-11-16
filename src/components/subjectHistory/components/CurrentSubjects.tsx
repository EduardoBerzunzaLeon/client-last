import { Card } from 'primereact/card';
import { Column } from 'primereact/column';
import { DataTable } from 'primereact/datatable';

import {
  ActionsBodyTemplate, StatusCurrentTemplate, StepBody, ModeBodyTemplate,
} from './columns';
import { Header } from './Header';
import { SubjectHistory } from '../../../interfaces/api';

interface Props {
    currentSubjects: SubjectHistory[],
    isEditable?: boolean,
    title?: string
}

export const CurrentSubjects = ({ currentSubjects, isEditable, title }: Props) => (
  <Card title={title}>
    { isEditable && (<Header />) }
    <DataTable
      value={currentSubjects}
      responsiveLayout="scroll"
      emptyMessage="Materias no encontradas"
    >
      <Column field="lastPhase.semester" header="Semestre" />
      <Column field="subject.name" header="Materia" />
      <Column
        field="step"
        header="Intento"
        body={StepBody}
      />
      <Column
        field="lastPhase.phaseStatus"
        header="Estatus"
        body={StatusCurrentTemplate}
      />
      <Column
        field="lastPhase.mode"
        header="Modalidad"
        body={ModeBodyTemplate}
      />
      { isEditable && (
        <Column
          body={ActionsBodyTemplate}
          exportable={false}
        />
      )}

    </DataTable>
  </Card>
);

CurrentSubjects.defaultProps = {
  isEditable: false,
  title: '',
};

export default CurrentSubjects;
