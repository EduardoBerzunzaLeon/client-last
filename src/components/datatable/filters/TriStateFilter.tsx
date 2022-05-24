import { ColumnFilterElementTemplateOptions } from 'primereact/column';
import { TriStateCheckbox } from 'primereact/tristatecheckbox';

export const TriStateFilter = ({
  value,
  filterApplyCallback,
}: ColumnFilterElementTemplateOptions) => (
  <TriStateCheckbox
    value={value}
    onChange={(e) => filterApplyCallback(e.value)}
  />
);

export default TriStateFilter;
