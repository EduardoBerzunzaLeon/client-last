import { DataTableFilterMeta } from 'primereact/datatable';
import { FilterMatchMode } from 'primereact/api';

export const initialFiltersValue: DataTableFilterMeta = {
  global: { value: '', matchMode: FilterMatchMode.CONTAINS },
  name: { value: null, matchMode: FilterMatchMode.CONTAINS },
  core: { value: null, matchMode: FilterMatchMode.CONTAINS },
  semester: { value: null, matchMode: FilterMatchMode.EQUALS },
  credit: { value: null, matchMode: FilterMatchMode.EQUALS },
  deprecated: { value: null, matchMode: FilterMatchMode.EQUALS },
};

export default initialFiltersValue;
