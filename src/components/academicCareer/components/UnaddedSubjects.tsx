import { Card } from 'primereact/card';
import { Column } from 'primereact/column';
import { DataTable } from 'primereact/datatable';

import { GeneralSubject } from '../../../interfaces';
import { CoreBodyTemplate } from '../../subjects';

export const UnaddedSubjects = ({ subjects }: { subjects: GeneralSubject[] }) => (
  <Card title="Materias no agregadas">
    <DataTable
      value={subjects}
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
);

export default UnaddedSubjects;
