import { ColumnFilterElementTemplateOptions } from 'primereact/column';
import { Dropdown } from 'primereact/dropdown';
import { Generic, GroupOption, Option } from '../../../interfaces';

interface Props extends Generic {
    placeholder: string;
    options: Option[] | GroupOption[]
}

export const createSelectFilter = ({
  options, placeholder, ...restProps
}: Props) => ({
  value,
  filterApplyCallback,
}: ColumnFilterElementTemplateOptions) => (
  <Dropdown
    value={value}
    options={options}
    onChange={(e) => {
      filterApplyCallback(e.value);
    }}
    placeholder={placeholder}
    className="p-column-filter"
    showClear
    {...restProps}
  />
);

export default { createSelectFilter };
