import { useState } from 'react';

import { Column } from 'primereact/column';
import { DataTable } from 'primereact/datatable';

import { HeaderAdmin, SpinnerRTK } from '../../../components/ui';

import {
  CoreBodyTemplate,
  DeprecatedBodyTemplate,
  Header,
  SubjectContext,
  SubjectDetailDialog,
  SubjectDialog,
  initialFiltersValue,
  ActionsBodyTemplate,
} from '../../../components/subjects';
import { IntegerFilter, TriStateFilter } from '../../../components/datatable';
import { Subject } from '../../../interfaces';

import { useGetSubjectsQuery } from '../../../redux/subject/subject.api';
import { useLazyParams } from '../../../hooks';

const { Provider } = SubjectContext;

export const SubjectsScreen = () => {
  const {
    lazyParams,
    setLazyParams,
    setFilterValue,
    onPage,
    onSort,
    onFilter,
    paginatorURL,
  } = useLazyParams(initialFiltersValue, 'subjects');

  const [ displayModal, setDisplayModal ] = useState(false);
  const [ isOpenDetailModal, setIsOpenDetailModal ] = useState(false);
  const [ subjectSelected, setSubjectSelected ] = useState<Subject>();

  const {
    data, isError, error, isLoading, isFetching,
  } = useGetSubjectsQuery(paginatorURL);

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
                setFilterValue,
                setSubjectSelected,
                setIsOpenDetailModal,
              }}
              >
                <div>
                  <HeaderAdmin position="subjects/" title="Gestionar Materias" hasBreadcumbs />
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
                        filterElement={IntegerFilter}
                        filterPlaceholder="Buscar por semestre"
                      />
                      <Column
                        header="Creditos"
                        field="credit"
                        filterField="credit"
                        sortable
                        filter
                        showFilterMenu={false}
                        filterElement={IntegerFilter}
                        filterPlaceholder="Buscar por creditos"
                      />
                      <Column
                        field="deprecated"
                        header="Deprecado"
                        dataType="boolean"
                        style={{ minWidth: '6rem' }}
                        body={DeprecatedBodyTemplate}
                        filter
                        filterElement={TriStateFilter}
                      />
                      <Column
                        body={ActionsBodyTemplate}
                        exportable={false}
                        style={{ minWidth: '13rem' }}
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
