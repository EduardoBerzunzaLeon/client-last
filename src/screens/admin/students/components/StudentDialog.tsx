import { skipToken } from '@reduxjs/toolkit/dist/query';
import { Dialog } from 'primereact/dialog';
import { useContext } from 'react';
import { SpinnerRTK } from '../../../../components/spinnerRTK/SpinnerRTK';
import { useModalLoading } from '../../../../hooks/useModalLoading';
import { useTitle } from '../../../../hooks/useTitle';
import { useGetStudentsQuery } from '../../../../redux/student/student.api';
import { StudentContext } from '../context/studentContext';
import { StudentDataForm } from './StudentDataForm';

export const StudentDialog = () => {
  const {
    studentSelected, displayModal, setStudentSelected, setDisplayModal,
  } = useContext(StudentContext);

  const {
    student,
    error,
    isFetching,
    isError,
  } = useGetStudentsQuery(studentSelected ? 'students' : skipToken, {
    selectFromResult: ({
      // eslint-disable-next-line no-shadow
      data, error, isFetching, isError,
    }) => ({
      student: data?.data.find((stu) => stu.id === studentSelected?.id),
      error,
      isError,
      isFetching,
    }),
  });

  const { title } = useTitle({
    createTitle: 'Crear Alumno',
    updateTitle: 'Editar Alumno',
    displayModal,
    hasEntitySelected: !!studentSelected,
  });

  const { isLoading } = useModalLoading({
    isFetching,
    hasData: !!student,
    hasEntitySelected: !!studentSelected,
  });

  return (
    <Dialog
      header={title}
      className="shadow-5 w-11 md:w-6 lg:w-5"
      modal
      visible={displayModal}
      onHide={() => {
        setStudentSelected(undefined);
        setDisplayModal(false);
      }}
    >
      <SpinnerRTK
        data={{ data: student, status: 'success' }}
        error={error}
        isError={isError}
        isLoading={isFetching && isLoading}
        messageError="No se encontró el tutor"
        messageLoading="Cargando Tutor"
        classNameSpinner="flex flex-column align-items-center justify-content-center"
      >

        {({ data: dataSend }) => (
          <div className="formgrid">
            <StudentDataForm student={dataSend} />
          </div>
        )}
      </SpinnerRTK>
    </Dialog>
  );
};

export default StudentDialog;
