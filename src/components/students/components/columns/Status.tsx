import { Badge } from '../../../ui';
import { createSelectFilter } from '../../../datatable';
import { GroupOption, StudentStatus } from '../../../../interfaces';
import { statusGroupOptions } from '../../assets';

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

export const StatusFilter = createSelectFilter({
  options: statusGroupOptions,
  placeholder: 'Elige el status',
  optionGroupTemplate: groupedItemTemplate,
  optionLabel: 'label',
  optionGroupLabel: 'label',
  optionGroupChildren: 'items',
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
