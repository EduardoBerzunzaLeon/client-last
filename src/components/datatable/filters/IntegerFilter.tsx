import { ColumnFilterElementTemplateOptions } from 'primereact/column';
import { InputText } from 'primereact/inputtext';

export const IntegerFilter = ({
  value,
  filterApplyCallback,
}: ColumnFilterElementTemplateOptions) => (
  <InputText
    keyfilter="pint"
    value={value ?? ''}
    onChange={(e) => {
      filterApplyCallback(e.target.value);
    }}
    placeholder="Buscar con números enteros"
    className="p-column-filter"
  />
);

export default { IntegerFilter };
