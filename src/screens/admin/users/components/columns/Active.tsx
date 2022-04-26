import { ColumnFilterElementTemplateOptions } from 'primereact/column';
import { TriStateCheckbox } from 'primereact/tristatecheckbox';
import { User } from '../../../../../interfaces/api';

export const ActiveBodyTemplate = ({ active }: User) => (
  <i
    className={`pi ${
      active
        ? 'true-icon pi-check-circle'
        : 'false-icon pi-times-circle'
    }`}
  />
);

export const ActiveRowFilterTemplate = ({
  value,
  filterApplyCallback,
}: ColumnFilterElementTemplateOptions) => (
  <TriStateCheckbox
    value={value}
    onChange={(e) => filterApplyCallback(e.value)}
  />
);

export default {
  ActiveBodyTemplate,
  ActiveRowFilterTemplate,
};
