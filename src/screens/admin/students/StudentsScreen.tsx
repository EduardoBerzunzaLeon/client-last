import { Column } from 'primereact/column';
import { DataTable } from 'primereact/datatable';
import { useState } from 'react';

import {
  GenderBody, GenderFilter,
} from '../../../components/datatable';
import { ActionsBodyTemplate } from './components/columns/Actions';
import { Header } from './components/Header';
import { HeaderAdmin } from '../../../components/headerAdmin/HeaderAdmin';
import { initialFiltersValue } from './assets/assets';
import { StudentContext } from './context/studentContext';
import { SpinnerRTK } from '../../../components/spinnerRTK/SpinnerRTK';
import { StudentResume } from '../../../interfaces/api';

import { useLazyParams } from '../../../hooks/useLazyParams';
import { useGetStudentsQuery } from '../../../redux/student/student.api';

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
                    showFilterMenu={false}
                    sortable
                  />
                  <Column
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
                    header="En riesgo"
                    showFilterMenu={false}
                    sortable
                  />
                  <Column
                    field="status.status"
                    filter
                    filterField="status.status"
                    filterPlaceholder="Buscar por estatus"
                    header="Estatus"
                    showFilterMenu={false}
                    sortable
                  />
                  <Column
                    field="professor.name.first"
                    filter
                    filterField="professor.name.first"
                    filterPlaceholder="Buscar por nombre del profesor"
                    header="Profesor"
                    showFilterMenu={false}
                    sortable
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
