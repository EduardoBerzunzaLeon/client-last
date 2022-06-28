import { Subject } from '../../../../interfaces';
import { Badge } from '../../../ui';

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
