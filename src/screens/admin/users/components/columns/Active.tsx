import { ColumnFilterElementTemplateOptions } from 'primereact/column';

import { TriStateCheckbox } from 'primereact/tristatecheckbox';
import { Badge } from '../../../../../components/badge/Badge';
import { User } from '../../../../../interfaces/api';

export const ActiveBodyTemplate = ({ active }: User) => (
  <Badge
    text={active ? 'Activo' : 'Inactivo'}
    matchObject={{
      true: 'success',
      false: 'danger',
    }}
    match={active.toString()}
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
