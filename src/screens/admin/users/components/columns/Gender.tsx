import { ColumnFilterElementTemplateOptions } from 'primereact/column';
import { Dropdown } from 'primereact/dropdown';
import { User } from '../../../../../interfaces/api';

const genders = [
  { label: 'Masculino', value: 'M' },
  { label: 'Femenino', value: 'F' },
];

export const GenderRowFilterTemplate = ({
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

export const GenderBodyTemplate = ({ gender }: User) => <span>{gender === 'M' ? 'Masculino' : 'Femenino'}</span>;

export default { GenderRowFilterTemplate, GenderBodyTemplate };
