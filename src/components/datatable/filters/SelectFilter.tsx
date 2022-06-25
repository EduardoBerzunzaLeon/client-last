import { ColumnFilterElementTemplateOptions } from 'primereact/column';
import { Dropdown, DropdownOptionGroupTemplateType } from 'primereact/dropdown';

export interface Option {
    label: string,
    value: string
}

export interface GroupOption {
  label: string,
  items: Option[]
}

interface Props {
    placeholder: string;
    options: Option[] | GroupOption[]
    optionGroupTemplate?: DropdownOptionGroupTemplateType
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

export const createSelectGroupFilter = ({ options, placeholder, optionGroupTemplate }: Props) => ({
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
    optionLabel="label"
    optionGroupLabel="label"
    optionGroupChildren="items"
    optionGroupTemplate={optionGroupTemplate}
  />
);

export default { createSelectFilter, createSelectGroupFilter };
