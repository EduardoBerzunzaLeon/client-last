import { DataTableFilterMatchModeType } from 'primereact/datatable';

import { FilterOptionsProps, Paginator, Generic } from '../../interfaces';

export const prepareFilters = (filterOptions: FilterOptionsProps) => {
  const filterEquivalence: Record<DataTableFilterMatchModeType, string> = {
    contains: '[regex]=',
    equals: '=',
    notEquals: '[ne]=',
    lt: '[lt]=',
    gt: '[gt]=',
    startsWith: '[regex]=',
    notContains: '[regex]=',
    endsWith: '[regex]=',
    in: '[in]=',
    lte: '[lte]=',
    gte: '[gte]=',
    between: '[between]=',
    dateIs: '[regex]=',
    dateIsNot: '[regex]=',
    dateBefore: '[regex]=',
    dateAfter: '[regex]=',
    custom: '[regex]=',
  };

  if (!filterOptions) return null;
  return Object.keys(filterOptions).map((fieldName) => {
    const filter = filterOptions[fieldName];

    // ? Not pass falsy values except boolean false
    if ('value' in filter && (filter.value || filter.value === false)) {
      const matchMode = filterEquivalence[filter.matchMode] ?? '[regex]=';
      return `${fieldName}${matchMode}${encodeURIComponent(filter.value)}`
        .replaceAll('.', '-');
    }
    return '';
  }).filter(Boolean).join('&');
};

export const transformQueryWithPaginator = (path: string) => ({
  sortField,
  sortOrder,
  filters,
  fields,
  page = 1,
  rows = 10,
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

  const prepareFiltersElements = prepareFilters(filters);
  const sanitizeFiltersParams = prepareFiltersElements ? `&${prepareFiltersElements}` : '';

  return `${path}/?page=${page}${result}${sanitizeFiltersParams}`;
};
