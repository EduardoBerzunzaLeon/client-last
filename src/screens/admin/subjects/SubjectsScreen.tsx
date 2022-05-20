import { useState } from 'react';

import { Column } from 'primereact/column';
import { DataTable } from 'primereact/datatable';

import { ActionsBodyTemplate } from './components/columns/Actions';
import { CoreBodyTemplate } from './components/columns/Core';
import { DeprecatedBodyTemplate } from './components/columns/Deprecated';
import { Header } from './components/Header';
import { initialFiltersValue } from './assets/assets';
import { IntegerFilterTemplate } from '../../../components/datatable/IntegerFilterTemplate';
import { SpinnerRTK } from '../../../components/spinnerRTK/SpinnerRTK';
import { Subject } from '../../../interfaces/api';
import { SubjectContext } from './context/subjectContext';
import { SubjectDetailDialog } from './components/SubjectDetailDialog';
import { SubjectDialog } from './components/SubjectDialog';
import { TriStateFilterTemplate } from '../../../components/datatable/TriStateFilterTemplate';

import { useGetSubjectsQuery } from '../../../redux/subject/subject.api';
import { useLazyParams } from '../../../hooks/useLazyParams';
import { HeaderAdmin } from '../../../components/headerAdmin/HeaderAdmin';

const { Provider } = SubjectContext;

export const SubjectsScreen = () => {
  const {
    lazyParams,
    setLazyParams,
    onPage,
    onSort,
    onFilter,
    paginatorValues,
  } = useLazyParams(initialFiltersValue);

  const [ displayModal, setDisplayModal ] = useState(false);
  const [ isOpenDetailModal, setIsOpenDetailModal ] = useState(false);
  const [ subjectSelected, setSubjectSelected ] = useState<Subject>();

  const {
    data, isError, error, isLoading, isFetching,
  } = useGetSubjectsQuery(paginatorValues);

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
                isOpenDetailModal,
                lazyParams,
                subjectSelected,
                setDisplayModal,
                setLazyParams,
                setSubjectSelected,
                setIsOpenDetailModal,
              }}
              >
                <div>
                  <HeaderAdmin position="subjects/" title="Gestionar Materias" />
                  <div className="card">
                    <DataTable
                      value={dataSend}
                      lazy
                      filterDisplay="row"
                      responsiveLayout="scroll"
                      globalFilterFields={[ 'name', 'semester', 'credit', 'deprecated', 'core' ]}
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
                        header="Núcleo"
                        field="core"
                        sortable
                        showFilterMenu={false}
                        filter
                        filterField="core"
                        filterPlaceholder="Buscar por nombre"
                        body={CoreBodyTemplate}
                      />
                      <Column
                        header="Semestre"
                        filterField="semester"
                        field="semester"
                        sortable
                        filter
                        showFilterMenu={false}
                        filterElement={IntegerFilterTemplate}
                        filterPlaceholder="Buscar por semestre"
                      />
                      <Column
                        header="Creditos"
                        field="credit"
                        filterField="credit"
                        sortable
                        filter
                        showFilterMenu={false}
                        filterElement={IntegerFilterTemplate}
                        filterPlaceholder="Buscar por creditos"
                      />
                      <Column
                        field="deprecated"
                        header="Deprecado"
                        dataType="boolean"
                        style={{ minWidth: '6rem' }}
                        body={DeprecatedBodyTemplate}
                        filter
                        filterElement={TriStateFilterTemplate}
                      />
                      <Column
                        body={ActionsBodyTemplate}
                        exportable={false}
                        style={{ minWidth: '12rem' }}
                      />
                    </DataTable>
                  </div>
                  <SubjectDialog />
                  <SubjectDetailDialog />
                </div>
              </Provider>
            )
        }
    </SpinnerRTK>
  );
};

export default SubjectsScreen;
