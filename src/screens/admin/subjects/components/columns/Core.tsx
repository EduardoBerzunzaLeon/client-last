import { Badge } from '../../../../../components/badge/Badge';
import { Subject } from '../../../../../interfaces/api';

export const CoreBodyTemplate = ({ core }: Subject) => (
  <Badge
    text={core}
    matchObject={{
      básico: 'warning',
      sustantivo: 'success',
      integral: 'info',
    }}
    match={core.toString().toLowerCase()}
  />
);

export default {
  CoreBodyTemplate,
};
