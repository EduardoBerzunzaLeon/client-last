import { SubjectsStudied } from '../../../../interfaces';
import { Badge } from '../../../ui';

export const StatusBodyTemplate = ({ data }: SubjectsStudied) => {
  if (data?.status) {
    const { status } = data;
    return (
      <Badge
        text={status}
        matchObject={{
          cursando: 'info',
          reprobado: 'danger',
          aprobado: 'success',
        }}
        match={status}
      />
    );
  }
  return undefined;
};

export default StatusBodyTemplate;
