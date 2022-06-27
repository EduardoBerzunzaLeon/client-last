import { Badge } from '../../ui';

export const ActiveBody = ({ active }: {active: boolean}) => (
  <Badge
    text={active ? 'Activo' : 'Inactivo'}
    matchObject={{
      true: 'success',
      false: 'danger',
    }}
    match={active.toString()}
  />
);

export default ActiveBody;
