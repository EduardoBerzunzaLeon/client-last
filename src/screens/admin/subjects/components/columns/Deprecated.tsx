import { ColumnFilterElementTemplateOptions } from 'primereact/column';

import { TriStateCheckbox } from 'primereact/tristatecheckbox';
import { Badge } from '../../../../../components/badge/Badge';
import { Subject } from '../../../../../interfaces/api';

export const DeprecatedBodyTemplate = ({ deprecated }: Subject) => (
  <Badge
    text={deprecated ? 'Deprecado' : 'Activo'}
    matchObject={{
      true: 'danger',
      false: 'success',
    }}
    match={deprecated.toString()}
  />
);

export const DeprecatedRowFilterTemplate = ({
  value,
  filterApplyCallback,
}: ColumnFilterElementTemplateOptions) => (
  <TriStateCheckbox
    value={value}
    onChange={(e) => filterApplyCallback(e.value)}
  />
);

export default {
  DeprecatedBodyTemplate,
  DeprecatedRowFilterTemplate,
};
