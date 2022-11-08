import { useMemo } from 'react';

import { Card } from 'primereact/card';
import { Column } from 'primereact/column';
import { DataTable, DataTableFilterMeta } from 'primereact/datatable';
import { FilterMatchMode } from 'primereact/api';

import { SpinnerRTK } from '../../ui';

import { useGetErrosInSchoolYearFilesQuery } from '../../../redux/schoolYear/schoolYear.api';
import { useLazyParams } from '../../../hooks';

interface Props {
  start: number,
  end: number,
  status: 'generado' | 'no generado',
  endpointName: string,
  title: string,
}

export const FileErrorsTable = ({
  start, end, status, endpointName, title,
}: Props) => {
  const initialFiltersValue: DataTableFilterMeta = useMemo(() => ({
    start: { value: start, matchMode: FilterMatchMode.EQUALS },
    end: { value: end, matchMode: FilterMatchMode.EQUALS },
    status: { value: status, matchMode: FilterMatchMode.EQUALS },
    enrollment: { value: '', matchMode: FilterMatchMode.CONTAINS },
    subject: { value: '', matchMode: FilterMatchMode.CONTAINS },
    error: { value: '', matchMode: FilterMatchMode.CONTAINS },
  }), [ start, end, status ]);

  const {
    lazyParams,
    onPage,
    onSort,
    onFilter,
    paginatorURL,
  } = useLazyParams(initialFiltersValue, endpointName);

  const {
    data, isError, error, isLoading, isFetching,
  } = useGetErrosInSchoolYearFilesQuery(paginatorURL);

  return (
    <SpinnerRTK
      error={error}
      data={data}
      isLoading={isLoading}
      isError={isError}
    >
      {({ data: dataSend, total }) => (
        <Card title={title}>
          <DataTable
            value={dataSend}
            lazy
            filterDisplay="row"
            responsiveLayout="scroll"
            globalFilterFields={[ 'enrollment', 'subject', 'error' ]}
            dataKey="id"
            paginator
            first={lazyParams.first}
            rows={lazyParams.rows}
            totalRecords={total}
            onPage={onPage}
            onSort={onSort}
            sortField={lazyParams.sortField}
            sortOrder={lazyParams.sortOrder}
            onFilter={onFilter}
            filters={lazyParams.filters}
            loading={isFetching}
            emptyMessage="No se encontraron materias"
          >
            <Column
              header="Matricula"
              field="enrollment"
              sortable
              showFilterMenu={false}
              filter
              filterField="enrollment"
              filterPlaceholder="Buscar por matricula"
            />
            <Column
              header="Materia"
              field="subject"
              sortable
              showFilterMenu={false}
              filter
              filterField="subject"
              filterPlaceholder="Buscar por materia"
            />
            <Column
              header="Error"
              field="error"
              sortable
              showFilterMenu={false}
              filter
              filterField="error"
              filterPlaceholder="Buscar por error"
            />
          </DataTable>
        </Card>
      )}
    </SpinnerRTK>
  );
};

export default FileErrorsTable;
