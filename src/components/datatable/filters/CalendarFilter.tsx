import { addLocale, locale } from 'primereact/api';
import { Calendar } from 'primereact/calendar';
import { ColumnFilterElementTemplateOptions } from 'primereact/column';

addLocale('es', {
  firstDayOfWeek: 1,
  dayNames: [ 'domingo', 'lunes', 'martes', 'miércoles', 'jueves', 'viernes', 'sábado' ],
  dayNamesShort: [ 'dom', 'lun', 'mar', 'mié', 'jue', 'vie', 'sáb' ],
  dayNamesMin: [ 'D', 'L', 'M', 'X', 'J', 'V', 'S' ],
  monthNames: [ 'Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre' ],
  monthNamesShort: [ 'ene', 'feb', 'mar', 'abr', 'may', 'jun', 'jul', 'ago', 'sep', 'oct', 'nov', 'dic' ],
  today: 'Hoy',
  clear: 'Limpiar',
});

locale('es');

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
