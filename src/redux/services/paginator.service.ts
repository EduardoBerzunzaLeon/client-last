type MatchMode = 'contains' | 'equals';

interface FiltersValueProps {
    matchMode: MatchMode,
    value?: any,
  }

  interface FilterOptionsProps {
    [x: string]: FiltersValueProps
  }

export interface Paginator {
    page: string | void,
    sortField: string | void,
    sortOrder: string | void,
    filters: FilterOptionsProps
    rows?: number,
  }

export const prepareFilters = (filterOptions: FilterOptionsProps) => {
  const filterEquivalence: Record<MatchMode, string> = {
    contains: '[regex]=',
    equals: '=',
  };

  return Object.keys(filterOptions).map((fieldName) => {
    const f = filterOptions[fieldName];
    // ? Not pass falsy values except boolean false
    if (f.value || f.value === false) {
      const matchMode = filterEquivalence[f.matchMode] ?? '[regex]=';
      return `${fieldName}${matchMode}${encodeURIComponent(f.value)}`
        .replace('.', '_');
    }
    return '';
  }).filter(Boolean).join('&');
};

export const transformQueryWithPaginator = (path: string) => ({
  page = '1',
  sortField = '',
  sortOrder = '1',
  filters,
  rows = 10,
}: Paginator): string => `${path}/?page=${page}&sort=${sortField}&limit=${rows}&sortOrder=${sortOrder}&${prepareFilters(filters)}`;
