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

export default ActiveBodyTemplate;
