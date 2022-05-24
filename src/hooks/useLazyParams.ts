import { useState } from 'react';

import { DataTableFilterMeta, DataTablePFSEvent } from 'primereact/datatable';
import { transformQueryWithPaginator } from '../redux/services/paginator.service';

export const useLazyParams = (initialFiltersValue: DataTableFilterMeta, path?: string) => {
  const [ lazyParams, setLazyParams ] = useState<DataTablePFSEvent>({
    multiSortMeta: null,
    first: 0,
    rows: 10,
    page: 0,
    sortField: '',
    sortOrder: null,
    filters: { ...initialFiltersValue },
  });

  const paginatorValues = {
    page: lazyParams.page || 1,
    sortField: lazyParams.sortField,
    sortOrder: lazyParams.sortOrder,
    filters: lazyParams.filters,
    rows: lazyParams.rows,
  };

  const paginatorURL:string = transformQueryWithPaginator(path || '')(paginatorValues);

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

  return {
    lazyParams,
    setLazyParams,
    onPage,
    onSort,
    onFilter,
    paginatorURL,
  };
};

export default useLazyParams;
