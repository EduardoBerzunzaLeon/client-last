import { Badge } from '../../../../../components/ui';
import { Subject } from '../../../../../interfaces';

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
