import { useContext } from 'react';

import { skipToken } from '@reduxjs/toolkit/dist/query';
import { Dialog } from 'primereact/dialog';

import { SpinnerRTK } from '../../../../components/ui';
import { StudentContext } from '../context/studentContext';
import { StudentDataForm } from './StudentDataForm';
import { StudentResume } from '../../../../interfaces';

import { useGetStudentsQuery } from '../../../../redux/student/student.api';
import { useTitle, useModalLoading } from '../../../../hooks';

const initialValues: StudentResume = {
  name: {
    first: '',
    last: '',
  },
  atRisk: 'no',
  id: '',
  email: '',
  gender: 'M',
  enrollment: '',
  avatar: '',
  currentSemester: 1,
  classroom: 'A',
  active: true,
  status: {
    createdAt: new Date(),
    _id: '',
    status: 'regular',
  },
  studentId: '',
  professor: {
    name: {
      first: '',
      last: '',
    },
    id: '',
    avatar: '',
  },
  inChannelling: 'no',
};

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
      blockScroll
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
        messageError="No se encontró el alumno"
        messageLoading="Cargando Alumno"
        classNameSpinner="flex flex-column align-items-center justify-content-center"
      >

        {({ data: dataSend }) => (
          <div className="formgrid">
            <StudentDataForm student={dataSend ?? initialValues} buttonLabel={title} />
          </div>
        )}
      </SpinnerRTK>
    </Dialog>
  );
};

export default StudentDialog;
