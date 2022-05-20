import { Badge } from '../../../../../components/badge/Badge';
import { Professor } from '../../../../../interfaces/api';

export const ActiveBodyTemplate = ({ active }: Professor) => (
  <Badge
    text={active ? 'Activo' : 'Inactivo'}
    matchObject={{
      true: 'success',
      false: 'danger',
    }}
    match={active.toString()}
  />
);

export default ActiveBodyTemplate;
