import { ColumnFilterElementTemplateOptions } from 'primereact/column';
import { Dropdown } from 'primereact/dropdown';

const genders = [
  { label: 'Masculino', value: 'M' },
  { label: 'Femenino', value: 'F' },
];

export const GenderFilter = ({
  value,
  filterApplyCallback,
}: ColumnFilterElementTemplateOptions) => (
  <Dropdown
    value={value}
    options={genders}
    onChange={(e) => {
      filterApplyCallback(e.value);
    }}
    placeholder="Elige el sexo"
    className="p-column-filter"
    showClear
  />
);

export default GenderFilter;
