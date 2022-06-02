import { useContext, useEffect } from 'react';

import { Dialog } from 'primereact/dialog';

// import { skipToken } from '@reduxjs/toolkit/dist/query';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { addLocale, locale } from 'primereact/api';
import { ProfessorContext } from '../../context/professorContext';
import { SpinnerRTK } from '../../../../../components/spinnerRTK/SpinnerRTK';
import { ActionsCoursesBodyTemplate, ImpartedAtBodyTemplate } from '../columns/ActionsCourses';
import { CourseDataForm } from './CourseDataForm';
import { useLazyParams } from '../../../../../hooks/useLazyParams';
import { initialFiltersCoursesValue } from '../../assets/assets';
import { useGetCoursesQuery } from '../../../../../redux/course/course.api';
import { CalendarFilter } from '../../../../../components/datatable/filters/CalendarFilter';
import { useModalLogin } from '../../../../../hooks/useModalLogin';

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

export const CoursesDialog = () => {
  const {
    professorSelected, displayCoursesModal, setProfessorSelected, setDisplayCoursesModal,
  } = useContext(ProfessorContext);

  const {
    lazyParams,
    setFilterValue,
    onPage,
    onSort,
    onFilter,
    paginatorURL,
  } = useLazyParams(initialFiltersCoursesValue, 'courses');

  const {
    data, isError, error, isFetching,
  } = useGetCoursesQuery(paginatorURL, { skip: !professorSelected });

  const { isLoading } = useModalLogin({
    isFetching,
    hasData: !!data,
    hasEntitySelected: !!professorSelected,
  });

  useEffect(() => {
    if (professorSelected) {
      setFilterValue('professor', professorSelected.id);
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [ professorSelected ]);

  return (
    <Dialog
      header="Cursos"
      className="shadow-5 w-11"
      modal
      visible={displayCoursesModal}
      onHide={() => {
        setProfessorSelected(undefined);
        setDisplayCoursesModal(false);
      }}
    >
      <div className="grid">

        <div className="col-12 md:col-4 ">
          <CourseDataForm professorId={professorSelected?.id} />
        </div>

        <div className="col-12 md:col-8 ">
          <SpinnerRTK
            data={data}
            error={error}
            isError={isError}
            isLoading={isFetching && isLoading}
            messageError="No se encontraron cursos"
            messageLoading="Cargando Cursos"
            classNameSpinner="flex flex-column align-items-center justify-content-center"
          >
            {({ data: dataSend, total }) => (
              <DataTable
                value={dataSend}
                lazy
                filterDisplay="row"
                responsiveLayout="scroll"
                dataKey="id"
                paginator
                totalRecords={total}
                loading={isFetching}
                first={lazyParams.first}
                rows={lazyParams.rows}
                onPage={onPage}
                onSort={onSort}
                sortField={lazyParams.sortField}
                sortOrder={lazyParams.sortOrder}
                onFilter={onFilter}
                filters={lazyParams.filters}
                emptyMessage="No se encontraron cursos"
              >
                <Column
                  field="name"
                  header="Nombre"
                  filter
                  filterField="name"
                  showFilterMenu={false}
                  filterPlaceholder="Buscar por nombre"
                />
                <Column
                  field="impartedAt"
                  header="Impartido el"
                  filterField="impartedAt"
                  dataType="date"
                  body={ImpartedAtBodyTemplate}
                  filter
                  showFilterMenu={false}
                  filterElement={CalendarFilter}
                />
                <Column
                  body={ActionsCoursesBodyTemplate}
                  header="Acciones"
                  exportable={false}
                />
              </DataTable>
            )}
          </SpinnerRTK>
        </div>
      </div>

    </Dialog>
  );
};

export default CoursesDialog;