import { Column } from 'primereact/column';
import { DataTable } from 'primereact/datatable';
import { useState } from 'react';

import { ActionsBodyTemplate } from './components/columns/Actions';
import { AtRiskBody, AtRiskFilter } from './components/columns/AtRisk';
import { GenderBody, GenderFilter } from '../../../components/datatable';
import { Header } from './components/Header';
import { HeaderAdmin } from '../../../components/headerAdmin/HeaderAdmin';
import { initialFiltersValue } from './assets/assets';
import { NameBodyTemplate } from './components/columns/Name';
import { ProfessorBodyTemplate } from './components/columns/Professor';
import { SemesterFilter } from './components/columns/Semester';
import { SpinnerRTK } from '../../../components/spinnerRTK/SpinnerRTK';
import { StatusBody, StatusFilter } from './components/columns/Status';
import { StudentContext } from './context/studentContext';
import { StudentDialog } from './components/StudentDialog';
import { StudentResume } from '../../../interfaces/api';

import { useLazyParams } from '../../../hooks/useLazyParams';
import { useGetStudentsQuery } from '../../../redux/student/student.api';
import { ProfessorsHistoryDialog } from './components/professorsHistory/ProfessorsHistoryDialog';
import { InChannellingBody, InChannellingFilter } from './components/columns/inChannelling';

const { Provider } = StudentContext;

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
  const [ displayProfessorsHistoryModal, setDisplayProfessorsHistoryModal ] = useState(false);
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
        ({ data: dataSend, total }) => (
          <Provider value={{
            displayModal,
            displayProfessorsHistoryModal,
            lazyParams,
            studentSelected,
            setDisplayModal,
            setDisplayProfessorsHistoryModal,
            setFilterValue,
            setLazyParams,
            setStudentSelected,
          }}
          >
            <div>
              <HeaderAdmin position="students/" title="Gestionar Alumnos" hasBreadcumbs />
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
                  totalRecords={total}
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
                    field="classroom"
                    filter
                    filterField="classroom"
                    filterPlaceholder="Buscar por grupo"
                    header="Grupo"
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
                    field="inChannelling"
                    filter
                    filterField="inChannelling"
                    filterPlaceholder="Buscar en canalización"
                    filterElement={InChannellingFilter}
                    body={InChannellingBody}
                    header="En Canalización"
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
                <StudentDialog />
                <ProfessorsHistoryDialog />
              </div>
            </div>
          </Provider>
        )
      }
    </SpinnerRTK>
  );
};

export default StudentsScreen;
