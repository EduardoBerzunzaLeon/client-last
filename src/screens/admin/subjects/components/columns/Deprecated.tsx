import { Badge } from '../../../../../components/ui';
import { Subject } from '../../../../../interfaces';

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
