import { Column } from 'primereact/column';
import { DataTable, DataTablePFSEvent } from 'primereact/datatable';
import { useState } from 'react';
import { SpinnerRTK } from '../../../components/spinnerRTK/SpinnerRTK';
import { Subject } from '../../../interfaces/api';
import { useGetSubjectsQuery } from '../../../redux/subject/subject.api';
import { initialFiltersValue } from './assets/assets';
import { ActionsBodyTemplate } from './components/columns/Actions';
import { DeprecatedBodyTemplate, DeprecatedRowFilterTemplate } from './components/columns/Deprecated';
import { SemestreRowFilterTemplate } from './components/columns/Semester';
import { Header } from './components/Header';
import { SubjectDialog } from './components/SubjectDialog';
import { SubjectContext } from './context/subjectContext';

const { Provider } = SubjectContext;

export const SubjectsScreen = () => {
  const [ lazyParams, setLazyParams ] = useState<any>({
    first: 0,
    rows: 10,
    page: 0,
    sortField: '',
    sortOrder: null,
    filters: { ...initialFiltersValue },
  });

  const [ displayModal, setDisplayModal ] = useState(false);
  const [ subjectSelected, setSubjectSelected ] = useState<Subject>();

  const {
    data, isError, error, isLoading, isFetching,
  } = useGetSubjectsQuery(
    {
      page: lazyParams.page + 1,
      sortField: lazyParams.sortField,
      sortOrder: lazyParams.sortOrder,
      filters: lazyParams.filters,
      rows: lazyParams.rows,
    },
  );
  const onPage = (event: DataTablePFSEvent) => {
    setLazyParams(event);
  };

  const onSort = (event: DataTablePFSEvent) => {
    setLazyParams(event);
  };

  const onFilter = (event: DataTablePFSEvent) => {
    // eslint-disable-next-line no-param-reassign
    event.first = 0;
    setLazyParams(event);
  };

  return (
    <SpinnerRTK
      data={data}
      error={error}
      isError={isError}
      isLoading={isLoading}
      messageError="No se encontró materias"
      messageLoading="Cargando Materias"
    >
      {
            ({ data: dataSend }) => (
              <Provider value={{
                displayModal,
                lazyParams,
                subjectSelected,
                setDisplayModal,
                setLazyParams,
                setSubjectSelected,
              }}
              >
                <div>
                  <div className="card">
                    <DataTable
                      value={dataSend}
                      lazy
                      filterDisplay="row"
                      responsiveLayout="scroll"
                      globalFilterFields={[ 'name', 'semester', 'credit', 'deprecated' ]}
                      dataKey="id"
                      header={<Header />}
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
                        header="Materia"
                        field="name"
                        sortable
                        showFilterMenu={false}
                        filter
                        filterField="name"
                        filterPlaceholder="Buscar por nombre"
                      />
                      <Column
                        header="Semestre"
                        filterField="semester"
                        field="semester"
                        sortable
                        filter
                        showFilterMenu={false}
                        filterElement={SemestreRowFilterTemplate}
                        filterPlaceholder="Buscar por semestre"
                      />
                      <Column
                        header="Creditos"
                        field="credit"
                        filterField="credit"
                        sortable
                        filter
                        showFilterMenu={false}
                        filterElement={SemestreRowFilterTemplate}
                        filterPlaceholder="Buscar por creditos"
                      />
                      <Column
                        field="deprecated"
                        header="Deprecado"
                        dataType="boolean"
                        style={{ minWidth: '6rem' }}
                        body={DeprecatedBodyTemplate}
                        filter
                        filterElement={DeprecatedRowFilterTemplate}
                      />
                      <Column
                        body={ActionsBodyTemplate}
                        exportable={false}
                        style={{ minWidth: '12rem' }}
                      />
                    </DataTable>
                  </div>
                  <SubjectDialog />
                </div>
              </Provider>
            )
        }
    </SpinnerRTK>
  );
};

export default SubjectsScreen;
