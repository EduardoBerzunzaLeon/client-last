// import { DataTableFilterMeta } from 'primereact/datatable';
import { FilterMatchMode } from 'primereact/api';
import { DataTableFilterMeta } from 'primereact/datatable';

export const initialFiltersValue: DataTableFilterMeta = {
  global: { value: '', matchMode: FilterMatchMode.CONTAINS },
  'name.last': { value: null, matchMode: FilterMatchMode.CONTAINS },
  'name.first': { value: null, matchMode: FilterMatchMode.CONTAINS },
  enrollment: { value: null, matchMode: FilterMatchMode.CONTAINS },
  gender: { value: null, matchMode: FilterMatchMode.CONTAINS },
  atRisk: { value: null, matchMode: FilterMatchMode.CONTAINS },
  'status.status': { value: null, matchMode: FilterMatchMode.CONTAINS },
  'professor.name.last': { value: null, matchMode: FilterMatchMode.CONTAINS },
  'professor.name.first': { value: null, matchMode: FilterMatchMode.CONTAINS },
  currentSemester: { value: null, matchMode: FilterMatchMode.EQUALS },
};

export default { initialFiltersValue };
