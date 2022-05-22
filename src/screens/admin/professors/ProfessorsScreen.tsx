import { Column } from 'primereact/column';
import { DataTable } from 'primereact/datatable';
import { useState } from 'react';
import { TriStateFilterTemplate } from '../../../components/datatable/TriStateFilterTemplate';
import { HeaderAdmin } from '../../../components/headerAdmin/HeaderAdmin';
import { SpinnerRTK } from '../../../components/spinnerRTK/SpinnerRTK';
import { useLazyParams } from '../../../hooks/useLazyParams';
import { Professor } from '../../../interfaces/api';
import { useGetProfessorsQuery } from '../../../redux/professor/professor.api';
import { initialFiltersValue } from './assets/assets';
import { ActionsBodyTemplate } from './components/columns/Actions';
import { ActiveBodyTemplate } from './components/columns/Active';
import { EmailBodyTemplate } from './components/columns/Email';
import { GenderBodyTemplate, GenderRowFilterTemplate } from './components/columns/Gender';
import { CoursesDialog } from './components/CoursesDialog';
import { Header } from './components/Header';
import { ProfessorDialog } from './components/ProfessorDialog';
import { ProfessorContext } from './context/professorContext';

const { Provider } = ProfessorContext;

export const ProfessorsScreen = () => {
  const {
    lazyParams,
    setLazyParams,
    onPage,
    onSort,
    onFilter,
    paginatorValues,
  } = useLazyParams(initialFiltersValue);

  const [ displayModal, setDisplayModal ] = useState(false);
  const [ displayCoursesModal, setDisplayCoursesModal ] = useState(false);
  const [ professorSelected, setProfessorSelected ] = useState<Professor>();

  const {
    data, isError, error, isLoading, isFetching,
  } = useGetProfessorsQuery(paginatorValues);

  return (
    <SpinnerRTK
      data={data}
      error={error}
      isError={isError}
      isLoading={isLoading}
      messageError="No se encontró usuarios"
      messageLoading="Cargando Usuarios"
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
            setProfessorSelected,
          }}
          >
            <div>
              <HeaderAdmin position="professors/" title="Gestionar Tutores" />
              <div className="card">
                <DataTable
                  value={dataSend}
                  lazy
                  filterDisplay="row"
                  header={<Header />}
                  responsiveLayout="scroll"
                  globalFilterFields={[ 'name.first', 'name.last', 'email', 'gender' ]}
                  dataKey="id"
                  paginator
                  first={lazyParams.first}
                  rows={lazyParams.rows}
                  totalRecords={7}
                  onPage={onPage}
                  onSort={onSort}
                  sortField={lazyParams.sortField}
                  sortOrder={lazyParams.sortOrder}
                  onFilter={onFilter}
                  filters={lazyParams.filters}
                  loading={isFetching}
                >
                  <Column
                    header="Nombre"
                    field="name.first"
                    sortable
                    showFilterMenu={false}
                    filter
                    filterField="name.first"
                    filterPlaceholder="Buscar por nombre"
                  />
                  <Column
                    header="Apellido"
                    filterField="name.last"
                    field="name.last"
                    sortable
                    filter
                    showFilterMenu={false}
                    filterPlaceholder="Buscar por apellido"
                  />
                  <Column
                    header="Email"
                    field="email"
                    filterField="email"
                    body={EmailBodyTemplate}
                    sortable
                    filter
                    showFilterMenu={false}
                    filterPlaceholder="Buscar por correo"
                  />
                  <Column
                    field="gender"
                    header="Sexo"
                    filter
                    filterPlaceholder="Buscar por sexo"
                    body={GenderBodyTemplate}
                    filterElement={GenderRowFilterTemplate}
                    showFilterMenu={false}
                  />
                  <Column
                    field="active"
                    header="Activo"
                    dataType="boolean"
                    style={{ minWidth: '6rem' }}
                    body={ActiveBodyTemplate}
                    filter
                    filterElement={TriStateFilterTemplate}
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
