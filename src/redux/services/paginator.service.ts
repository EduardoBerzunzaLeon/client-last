import { FilterOptionsProps, MatchMode, Paginator } from '../../interfaces/api';
import { Generic } from '../../interfaces/generic';

export const prepareFilters = (filterOptions: FilterOptionsProps) => {
  const filterEquivalence: Record<MatchMode, string> = {
    contains: '[regex]=',
    equals: '=',
    notEquals: '[ne]=',
  };

  return Object.keys(filterOptions).map((fieldName) => {
    const f = filterOptions[fieldName];
    // ? Not pass falsy values except boolean false
    if (f.value || f.value === false) {
      const matchMode = filterEquivalence[f.matchMode] ?? '[regex]=';
      return `${fieldName}${matchMode}${encodeURIComponent(f.value)}`
        .replace('.', '/');
    }
    return '';
  }).filter(Boolean).join('&');
};

export const transformQueryWithPaginator = (path: string) => ({
  page = '1',
  sortField,
  sortOrder,
  filters,
  fields,
  rows,
}: Paginator): string => {
  const options: Generic = {
    fields: 'fields',
    rows: 'limit',
    sortField: 'sort',
    sortOrder: 'sortOrder',
  };

  const values: Generic = {
    fields,
    sortField,
    rows,
    sortOrder,
  };

  const result = Object.keys(options).map((key) => ((values[key])
    ? `&${options[key]}=${values[key]}`
    : '')).join('');

  return `${path}/?page=${page}${result}&${prepareFilters(filters)}`;
};
