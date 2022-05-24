import { Calendar } from 'primereact/calendar';
import { ColumnFilterElementTemplateOptions } from 'primereact/column';

export const CalendarFilter = ({
  value,
  filterApplyCallback,
  filterCallback,
}: ColumnFilterElementTemplateOptions) => (
  <Calendar
    id="range"
    value={value}
    onChange={(e) => {
      if (Array.isArray(e.value) && e.value[1] !== null) {
        filterApplyCallback(e.value);
      } else {
        filterCallback(e.value);
      }
    }}
    selectionMode="range"
    readOnlyInput
  />
);

export default { CalendarFilter };
