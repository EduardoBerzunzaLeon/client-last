import { Column } from 'primereact/column';
import { DataTable } from 'primereact/datatable';
import { useState } from 'react';

import {
  ActiveBody, GenderBody, GenderFilter, TriStateFilter,
} from '../../../components/datatable';

import {
  ProfessorContext,
  EmailBodyTemplate,
  ProfessorDialog,
  CoursesDialog,
  Header,
  initialFiltersValue,
  ActionsBodyTemplate,
} from '../../../components/professors';

import { Professor } from '../../../interfaces';
import { SpinnerRTK, HeaderAdmin } from '../../../components/ui';

import { useGetProfessorsQuery } from '../../../redux/professor/professor.api';
import { useLazyParams } from '../../../hooks';

const { Provider } = ProfessorContext;

export const ProfessorsScreen = () => {
  const {
    lazyParams,
    setLazyParams,
    setFilterValue,
    onPage,
    onSort,
    onFilter,
    paginatorURL,
  } = useLazyParams(initialFiltersValue, 'professors');

  const [ displayModal, setDisplayModal ] = useState(false);
  const [ displayCoursesModal, setDisplayCoursesModal ] = useState(false);
  const [ professorSelected, setProfessorSelected ] = useState<Professor>();

  const {
    data, isError, error, isLoading, isFetching,
  } = useGetProfessorsQuery(paginatorURL);

  return (
    <SpinnerRTK
      data={data}
      error={error}
      isError={isError}
      isLoading={isLoading}
      messageError="No se encontrarón profesores"
      messageLoading="Cargando Profesores"
    >
      {
        ({ data: dataSend }) => (
          <Provider value={{
            displayModal,
            displayCoursesModal,
            lazyParams,
            professorSelected,
            setDisplayModal,
            setDisplayCoursesModal,
            setLazyParams,
            setFilterValue,
            setProfessorSelected,
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
                    body={EmailBodyTemplate}
                    field="email"
                    filter
                    filterField="email"
                    filterPlaceholder="Buscar por correo"
                    header="Email"
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
                    body={ActiveBody}
                    dataType="boolean"
                    field="active"
                    filter
                    filterElement={TriStateFilter}
                    header="Activo"
                    style={{ minWidth: '6rem' }}
                  />
                  <Column
                    body={ActionsBodyTemplate}
                    exportable={false}
                    style={{ minWidth: '13rem' }}
                  />
                </DataTable>
              </div>
              <ProfessorDialog />
              <CoursesDialog />
            </div>
          </Provider>
        )
      }
    </SpinnerRTK>
  );
};

export default ProfessorsScreen;
