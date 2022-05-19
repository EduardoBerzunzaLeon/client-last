import { DataTableFilterMetaData, DataTableOperatorFilterMetaData } from 'primereact/datatable';

// export type MatchMode = 'contains' | 'equals' | 'notEquals' | 'lt' | 'gt';

// export interface FiltersValueProps {
//     matchMode: MatchMode,
//     value?: any,
//   }

export interface FilterOptionsProps {
    [key: string]: DataTableFilterMetaData | DataTableOperatorFilterMetaData
  }

export interface Paginator {
    page: number | void,
    sortField: string | null,
    sortOrder: 1 | 0 | -1 | undefined | null,
    filters: FilterOptionsProps,
    fields?: string,
    rows?: number,
  }
