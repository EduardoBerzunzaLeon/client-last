import { Card } from 'primereact/card';
import { Column } from 'primereact/column';
import { DataTable } from 'primereact/datatable';
import { FilterMatchMode } from 'primereact/api';

import { CourseProfessor } from '../../../../interfaces/api';
import { ImpartedAtBodyTemplate } from '../../professors/components/columns/ActionsCourses';

const CoursesTable = ({ courses } : {courses: [CourseProfessor] | []}) => (
  <Card title="Cursos">
    <DataTable
      value={courses}
      responsiveLayout="scroll"
      paginator
      sortMode="multiple"
      rows={5}
      filters={{
        name: { value: null, matchMode: FilterMatchMode.CONTAINS },
        impartedAt: { value: null, matchMode: FilterMatchMode.CONTAINS },
      }}
      filterDisplay="row"
      emptyMessage="No se encontraron cursos"
    >
      <Column
        field="name"
        header="Curso"
        sortable
        filter
        showFilterMenu={false}
        filterPlaceholder="Buscar por nombre"
      />
      <Column
        field="impartedAt"
        header="Impartido el"
        body={ImpartedAtBodyTemplate}
        sortable
        filter
        showFilterMenu={false}
        filterPlaceholder="Buscar por Fecha"
      />
    </DataTable>
  </Card>
);

export default CoursesTable;
