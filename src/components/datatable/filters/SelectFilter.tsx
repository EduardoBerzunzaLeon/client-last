import { ColumnFilterElementTemplateOptions } from 'primereact/column';
import { Dropdown } from 'primereact/dropdown';

interface Option {
    label: string,
    value: string
}

interface Props {
    placeholder: string;
    options: Option[]
}

export const createSelectFilter = ({ options, placeholder }: Props) => ({
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
  />
);

export default { createSelectFilter };
