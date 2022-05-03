export type MatchMode = 'contains' | 'equals';

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
    filters: FilterOptionsProps
    rows?: number,
  }
