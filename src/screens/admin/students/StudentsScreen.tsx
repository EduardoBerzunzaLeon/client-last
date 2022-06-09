import { Column } from 'primereact/column';
import { DataTable } from 'primereact/datatable';
import { useState } from 'react';

import {
  GenderBody, GenderFilter, createSelectFilter,
} from '../../../components/datatable';
import { ActionsBodyTemplate } from './components/columns/Actions';
import { Header } from './components/Header';
import { HeaderAdmin } from '../../../components/headerAdmin/HeaderAdmin';
import { initialFiltersValue } from './assets/assets';
import { StudentContext } from './context/studentContext';
import { SpinnerRTK } from '../../../components/spinnerRTK/SpinnerRTK';
import { StudentResume, StudentStatus } from '../../../interfaces/api';

import { useLazyParams } from '../../../hooks/useLazyParams';
import { useGetStudentsQuery } from '../../../redux/student/student.api';
import { Badge } from '../../../components/badge/Badge';
import { NameBodyTemplate } from './components/columns/Name';
import { ProfessorBodyTemplate } from './components/columns/Professor';

const semesterOptions = [
  { label: 'Semestre 1', value: '1' },
  { label: 'Semestre 2', value: '2' },
  { label: 'Semestre 3', value: '3' },
  { label: 'Semestre 4', value: '4' },
  { label: 'Semestre 5', value: '5' },
  { label: 'Semestre 6', value: '6' },
  { label: 'Semestre 7', value: '7' },
  { label: 'Semestre 8', value: '8' },
  { label: 'Semestre 9', value: '9' },
];

const atRiskOptions = [
  { label: 'No', value: 'no' },
  { label: 'Último intento', value: 'ultimo intento' },
  { label: 'Única materia', value: 'unica materia' },
  { label: 'No termina', value: 'no termina' },
];

const statusOptions = [
  { label: 'Regular', value: 'regular' },
  { label: 'Baja', value: 'baja' },
  { label: 'Baja Temporal', value: 'baja temporal' },
  { label: 'Egresado', value: 'egresado' },
];

const { Provider } = StudentContext;
const SemesterFilter = createSelectFilter({ options: semesterOptions, placeholder: 'Elige el semestre' });
const AtRiskFilter = createSelectFilter({ options: atRiskOptions, placeholder: 'Elige el riesgo' });
const StatusFilter = createSelectFilter({ options: statusOptions, placeholder: 'Elige el status' });

const AtRiskBody = ({ atRisk }: { atRisk: string }) => {
  const atRiskCleaned = atRisk.replaceAll(' ', '');

  return (
    <Badge
      text={atRisk}
      matchObject={{
        no: 'success',
        ultimointento: 'danger',
        unicamateria: 'danger',
        notermina: 'danger',
      }}
      match={atRiskCleaned}
    />
  );
};

const StatusBody = ({ status }: { status: StudentStatus }) => {
  const atRiskCleaned = status.status.replaceAll(' ', '');

  return (
    <Badge
      text={status.status}
      matchObject={{
        regular: 'warning',
        baja: 'danger',
        bajatemporal: 'danger',
        egresado: 'success',
      }}
      match={atRiskCleaned}
    />
  );
};

export const StudentsScreen = () => {
  const {
    lazyParams,
    setLazyParams,
    setFilterValue,
    onPage,
    onSort,
    onFilter,
    paginatorURL,
  } = useLazyParams(initialFiltersValue, 'students');

  const [ displayModal, setDisplayModal ] = useState(false);
  const [ studentSelected, setStudentSelected ] = useState<StudentResume>();

  const {
    data, isError, error, isLoading, isFetching,
  } = useGetStudentsQuery(paginatorURL);

  return (
    <SpinnerRTK
      data={data}
      error={error}
      isError={isError}
      isLoading={isLoading}
      messageError="No se encontrarón alumnos"
      messageLoading="Cargando Alumnos"
    >
      {
        ({ data: dataSend }) => (
          <Provider value={{
            displayModal,
            lazyParams,
            studentSelected,
            setDisplayModal,
            setLazyParams,
            setFilterValue,
            setStudentSelected,
          }}
          >
            <div>
              <HeaderAdmin position="professors/" title="Gestionar Tutores" hasBreadcumbs />
              <div className="card">
                <DataTable
                  value={dataSend}
                  dataKey="id"
                  filterDisplay="row"
                  filters={lazyParams.filters}
                  first={lazyParams.first}
                  globalFilterFields={[ 'name.first', 'name.last', 'email', 'gender' ]}
                  header={<Header />}
                  lazy
                  loading={isFetching}
                  onFilter={onFilter}
                  onPage={onPage}
                  onSort={onSort}
                  paginator
                  responsiveLayout="scroll"
                  rows={lazyParams.rows}
                  sortField={lazyParams.sortField}
                  sortOrder={lazyParams.sortOrder}
                  totalRecords={7}
                >
                  <Column
                    field="enrollment"
                    filter
                    filterField="enrollment"
                    filterPlaceholder="Buscar por matricula"
                    header="Matricula"
                    showFilterMenu={false}
                    sortable
                  />
                  <Column
                    field="currentSemester"
                    filter
                    filterField="currentSemester"
                    filterPlaceholder="Buscar por semestre"
                    header="Semestre"
                    filterElement={SemesterFilter}
                    showFilterMenu={false}
                    sortable
                  />
                  <Column
                    body={NameBodyTemplate}
                    field="name.first"
                    filter
                    filterField="name.first"
                    filterPlaceholder="Buscar por nombre"
                    header="Nombre"
                    showFilterMenu={false}
                    sortable
                  />
                  <Column
                    field="name.last"
                    filter
                    filterField="name.last"
                    filterPlaceholder="Buscar por apellido"
                    header="Apellido"
                    showFilterMenu={false}
                    sortable
                  />
                  <Column
                    field="atRisk"
                    filter
                    filterField="atRisk"
                    filterPlaceholder="Buscar por riesgo"
                    filterElement={AtRiskFilter}
                    body={AtRiskBody}
                    header="En riesgo"
                    showFilterMenu={false}
                    sortable
                  />
                  <Column
                    body={StatusBody}
                    field="status.status"
                    filter
                    filterField="status.status"
                    filterPlaceholder="Buscar por estatus"
                    header="Estatus"
                    filterElement={StatusFilter}
                    showFilterMenu={false}
                    sortable
                  />
                  <Column
                    body={ProfessorBodyTemplate}
                    field="professor.name.first"
                    filter
                    filterField="professor.name.first"
                    filterPlaceholder="Buscar por nombre del profesor"
                    header="Nombre Profesor"
                    showFilterMenu={false}
                    sortable
                    style={{ minWidth: '13rem' }}
                  />
                  <Column
                    field="professor.name.last"
                    filter
                    filterField="professor.name.last"
                    filterPlaceholder="Buscar por apellido del profesor"
                    header="Apellido(s) Profesor"
                    showFilterMenu={false}
                    sortable
                    style={{ minWidth: '13rem' }}
                  />
                  <Column
                    body={GenderBody}
                    field="gender"
                    filter
                    filterElement={GenderFilter}
                    filterPlaceholder="Buscar por sexo"
                    header="Sexo"
                    showFilterMenu={false}
                  />
                  <Column
                    body={ActionsBodyTemplate}
                    exportable={false}
                    style={{ minWidth: '13rem' }}
                  />
                </DataTable>
              </div>
            </div>
          </Provider>
        )
      }
    </SpinnerRTK>
  );
};

export default StudentsScreen;
