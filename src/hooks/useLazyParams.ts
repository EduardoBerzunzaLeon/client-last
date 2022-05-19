import { useState } from 'react';

import { DataTableFilterMeta, DataTablePFSEvent } from 'primereact/datatable';

export const useLazyParams = (initialFiltersValue: DataTableFilterMeta) => {
  const [ lazyParams, setLazyParams ] = useState<DataTablePFSEvent>({
    multiSortMeta: null,
    first: 0,
    rows: 10,
    page: 0,
    sortField: '',
    sortOrder: null,
    filters: { ...initialFiltersValue },
  });

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

  const paginatorValues = {
    page: lazyParams.page || 1,
    sortField: lazyParams.sortField,
    sortOrder: lazyParams.sortOrder,
    filters: lazyParams.filters,
    rows: lazyParams.rows,
  };

  return {
    lazyParams,
    setLazyParams,
    onPage,
    onSort,
    onFilter,
    paginatorValues,
  };
};

export default useLazyParams;
