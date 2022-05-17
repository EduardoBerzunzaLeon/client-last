export type MatchMode = 'contains' | 'equals' | 'notEquals' | 'lt' | 'gt';

export interface FiltersValueProps {
    matchMode: MatchMode,
    value?: any,
  }

export interface FilterOptionsProps {
    [x: string]: FiltersValueProps
  }

export interface Paginator {
    page: string | void,
    sortField: string | void,
    sortOrder: string | void,
    filters: FilterOptionsProps,
    fields?: string,
    rows?: number,
  }
