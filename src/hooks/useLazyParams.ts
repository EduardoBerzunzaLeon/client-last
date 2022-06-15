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
    // eslint-disable-next-line no-param-reassign
    event.page = event.page ? event.page + 1 : 0;
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

  const setFilterValue = (fieldName: string, value: any) => {
    setLazyParams((prev: any) => ({
      ...prev,
      filters: {
        ...prev.filters,
        [fieldName]: {
          ...prev.filters[fieldName],
          value,
        },
      },
    }));
  };

  return {
    lazyParams,
    setLazyParams,
    setFilterValue,
    onPage,
    onSort,
    onFilter,
    paginatorURL,
  };
};

export default useLazyParams;
