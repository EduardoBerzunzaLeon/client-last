import { useContext, useEffect, useState } from 'react';

import { Dialog } from 'primereact/dialog';

import { skipToken } from '@reduxjs/toolkit/dist/query';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { ProfessorContext } from '../context/professorContext';
import { useGetCoursesByProfessorQuery } from '../../../../redux/professor/professor.api';
import { SpinnerRTK } from '../../../../components/spinnerRTK/SpinnerRTK';
import { ActionsCoursesBodyTemplate } from './columns/ActionsCourses';
import { CourseDataForm } from './CourseDataForm';

export const CoursesDialog = () => {
  const {
    professorSelected, displayCoursesModal, setProfessorSelected, setDisplayCoursesModal,
  } = useContext(ProfessorContext);

  const [ isLoading, setIsLoading ] = useState(true);

  const {
    data, isError, error, isFetching,
  } = useGetCoursesByProfessorQuery(professorSelected?.id ?? skipToken);

  useEffect(() => {
    (!isFetching && data)
      && setIsLoading(false);

    (!professorSelected)
      && setIsLoading(true);
  }, [ isFetching, professorSelected ]);

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

        <div className="col-4 flex justify-content-center">
          <CourseDataForm />
        </div>

        <div className="col-8 flex align-items-center justify-content-center">
          <SpinnerRTK
            data={data}
            error={error}
            isError={isError}
            isLoading={isFetching && isLoading}
            messageError="No se encontró el tutor"
            messageLoading="Cargando Tutor"
            classNameSpinner="flex flex-column align-items-center justify-content-center"
          >
            {/* TODO: Add filter and sort */}
            {({ data: dataSend, total }) => (
              <DataTable
                value={dataSend}
                responsiveLayout="scroll"
                dataKey="id"
                paginator
                rows={5}
                totalRecords={total}
                loading={isFetching}
              >
                <Column field="name" header="Nombre" />
                <Column field="impartedAt" header="Impartido el" />
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
