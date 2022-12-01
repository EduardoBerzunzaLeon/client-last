import { useMemo } from 'react';

import { Card } from 'primereact/card';
import { Column } from 'primereact/column';
import { DataTable, DataTableFilterMeta } from 'primereact/datatable';
import { FilterMatchMode } from 'primereact/api';

import { SpinnerRTK } from '../../ui';

import { useGetErrosInSchoolYearFilesQuery } from '../../../redux/schoolYear/schoolYear.api';
import { useLazyParams } from '../../../hooks';

export interface DynamicColumn {
  field: string,
  header: string,
}

interface Props {
  start: number,
  end: number,
  status: 'generado' | 'no generado',
  endpointName: string,
  title: string,
  globalFilterFields?: string[],
  initialFilters?: object,
  columns?: DynamicColumn[]
}

const dynamicColumns: DynamicColumn[] = [
  { field: 'enrollment', header: 'Matricula' },
  { field: 'subject', header: 'Materia' },
  { field: 'error', header: 'Error' },
];

export const FileErrorsTable = ({
  start,
  end,
  status,
  endpointName,
  title,
  globalFilterFields,
  initialFilters,
  columns,
}: Props) => {
  const initialFiltersValue: DataTableFilterMeta = useMemo(() => ({
    start: { value: start, matchMode: FilterMatchMode.EQUALS },
    end: { value: end, matchMode: FilterMatchMode.EQUALS },
    status: { value: status, matchMode: FilterMatchMode.EQUALS },
    enrollment: { value: '', matchMode: FilterMatchMode.CONTAINS },
    subject: { value: '', matchMode: FilterMatchMode.CONTAINS },
    error: { value: '', matchMode: FilterMatchMode.CONTAINS },
    ...initialFilters,
  }), [ start, end, status, initialFilters ]);

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
            globalFilterFields={globalFilterFields}
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
            {
              columns?.map(({ field, header }) => (
                <Column
                  key={field}
                  header={header}
                  field={field}
                  sortable
                  showFilterMenu={false}
                  filter
                  filterField={field}
                  filterPlaceholder={`Buscar por ${header}`}
                />
              ))
            }

          </DataTable>
        </Card>
      )}
    </SpinnerRTK>
  );
};

FileErrorsTable.defaultProps = {
  globalFilterFields: [ 'enrollment', 'subject', 'error' ],
  initialFilters: {},
  columns: dynamicColumns,
};

export default FileErrorsTable;
