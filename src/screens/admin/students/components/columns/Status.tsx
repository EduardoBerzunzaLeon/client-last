import { Badge } from '../../../../../components/badge/Badge';
import { createSelectGroupFilter } from '../../../../../components/datatable';
import { statusGroupOptions } from '../../assets/options';
import { StudentStatus } from '../../../../../interfaces/api';
import { GroupOption } from '../../../../../components/datatable/filters/SelectFilter';

const groupedItemTemplate = (option: GroupOption) => (
  <Badge
    text={option.label}
    matchObject={{
      Regular: 'success',
      Irregular: 'danger',
    }}
    match={option.label}
  />
);

export const StatusFilter = createSelectGroupFilter({
  options: statusGroupOptions,
  placeholder: 'Elige el status',
  optionGroupTemplate: groupedItemTemplate,
});

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
