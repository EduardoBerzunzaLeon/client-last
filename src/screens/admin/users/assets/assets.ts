import { DataTableFilterMeta } from 'primereact/datatable';
import { FilterMatchMode } from 'primereact/api';

export const initialFiltersValue: DataTableFilterMeta = {
  global: { value: '', matchMode: FilterMatchMode.CONTAINS },
  'name.last': { value: null, matchMode: FilterMatchMode.CONTAINS },
  'name.first': { value: null, matchMode: FilterMatchMode.CONTAINS },
  email: { value: null, matchMode: FilterMatchMode.CONTAINS },
  gender: { value: null, matchMode: FilterMatchMode.CONTAINS },
  active: { value: null, matchMode: FilterMatchMode.EQUALS },
};

export default initialFiltersValue;
