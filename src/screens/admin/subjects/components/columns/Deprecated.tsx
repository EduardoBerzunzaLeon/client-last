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

export default DeprecatedBodyTemplate;
