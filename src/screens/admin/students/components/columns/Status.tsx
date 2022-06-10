import { Badge } from '../../../../../components/badge/Badge';
import { createSelectFilter } from '../../../../../components/datatable';
import { statusOptions } from '../../assets/options';
import { StudentStatus } from '../../../../../interfaces/api';

export const StatusFilter = createSelectFilter({ options: statusOptions, placeholder: 'Elige el status' });

export const StatusBody = ({ status }: { status: StudentStatus }) => {
  const atRiskCleaned = status.status.replaceAll(' ', '');

  return (
    <Badge
      text={status.status}
      matchObject={{
        regular: 'warning',
        baja: 'danger',
        bajatemporal: 'danger',
        egresado: 'success',
      }}
      match={atRiskCleaned}
    />
  );
};

export default { StatusFilter, StatusBody };
