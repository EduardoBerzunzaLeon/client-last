import { useContext, useState } from 'react';

import { Form, Formik } from 'formik';
import { Button } from 'primereact/button';
import * as Yup from 'yup';

import { AutoCompleteProfessors } from '../../profileProfessors';
import {
  convertModelToFormData,
  processError,
  setStudentFormErrors,
  genderRadio,
} from '../../../utils';
import { Divider } from '../../ui';
import {
  FileSingleInputApp,
  uploadOptions,
  InputTextApp,
  RadioGroup,
  FormElement,
  ToggleButtonApp,
} from '../../forms';
import { StudentResume } from '../../../interfaces';
import { ToastContext } from '../../../context';

import { useCreateStudentMutation, useUpdateStudentMutation } from '../../../redux/student/student.api';

interface Props {
    buttonLabel: string,
    student: StudentResume,
}

export const StudentDataForm = ({ student, buttonLabel }: Props) => {
  const [ createStudent, { isLoading: isLoadingCreate }] = useCreateStudentMutation();
  const [ updateStudent, { isLoading: isLoadingUpdate }] = useUpdateStudentMutation();

  const [ initialStudent, setInitialStudent ] = useState({
    first: student.name.first,
    last: student.name.last,
    gender: student.id ? student.gender : null,
    email: student.email,
    active: student.active,
    avatar: student.avatar || null,
    enrollment: student.enrollment,
    currentSemester: student.currentSemester,
    classroom: student.classroom || 'A',
    professor: {
      fullname: `${student.professor.name.first} ${student.professor.name.last ? ` ${student.professor.name.last}` : ''}`,
      value: student.professor.id,
      avatar: student.professor.avatar,
    },
  });

  const { showSuccess, showError } = useContext(ToastContext);

  return (
    <Formik
      initialValues={initialStudent}
      enableReinitialize
      onSubmit={async (values, { setFieldError, resetForm }) => {
        const {
          currentSemester,
          classroom,
          enrollment,
          professor: { value: professorId },
          active,
          ...personalData
        } = values;

        const prepareData = {
          studentData: {
            currentSemester,
            classroom,
            enrollment,
            professor: professorId,
          },
          id: student?.id || '',
          active: `${active}`,
          ...personalData,
        };

        const dataSend = convertModelToFormData(prepareData);
        let message = 'El alumno se actualizó con éxito';

        try {
          if (student.id) {
            await updateStudent(dataSend).unwrap();
            setInitialStudent({ ...values });
          } else {
            await createStudent(dataSend).unwrap();
            message = 'El alumno se creó con éxito';
            resetForm();
          }

          showSuccess({ detail: message });
        } catch (error) {
          const errors: string = processError({ error, showError });
          setStudentFormErrors({ errors, setFieldError });
        }
      }}
      validationSchema={Yup.object({
        first: Yup.string()
          .required('Requerido'),
        last: Yup.string()
          .required('Requerido'),
        email: Yup.string()
          .email('Email no tiene un formato valido')
          .required('Requerido'),
        gender: Yup.string()
          .required('Requerido'),
        enrollment: Yup.string().required('Requerido'),
        currentSemester: Yup.number().required('Requerido'),
        classroom: Yup.string().required('Requerido'),
        professor: Yup.object()
          .required('Requerido').nullable(),
      })}
    >

      {({
        values, isValid, isSubmitting, dirty, setFieldValue,
      }) => (
        <Form>

          <Divider text="Foto de Perfil" icon="image" />

          <FileSingleInputApp
            onChange={(primeFile) => {
              setFieldValue('avatar', primeFile);
            }}
            initialValue={initialStudent.avatar ?? values.avatar ?? ''}
            isLoading={isLoadingUpdate || isLoadingCreate}
            uploadOptions={uploadOptions}
            hasPersistence={Boolean(student?.id)}
          />

          <Divider text="Datos Personales" icon="user" />

          <div className="field pt-2 mt-4">
            <InputTextApp
              label="Nombre*"
              id="first"
              name="first"
              className="w-full"
              icon="pi pi-user"
            />
          </div>

          <div className="field pt-2">
            <InputTextApp
              label="Apellido(s)*"
              name="last"
              id="last"
              className="w-full"
              icon="pi pi-user-edit"
            />
          </div>

          <div className="field pt-2">
            <InputTextApp
              label="Email"
              name="email"
              id="email"
              keyfilter="email"
              className="w-full"
              icon="pi pi-envelope"
            />
          </div>

          <RadioGroup radios={genderRadio} />

          <Divider text="Datos Escolares" icon="user-edit" />

          <div className="field pt-2 ">
            <InputTextApp
              label="Matricula"
              name="enrollment"
              id="enrollment"
              className="w-full"
              icon="pi pi-pencil"
            />
          </div>

          <div className="formgroup-inline mt-4">
            <div className="col-12 md:col-6 pl-1">
              <InputTextApp
                label="Semestre*"
                id="currentSemester"
                name="currentSemester"
                className="w-full"
                icon="pi pi-pencil"
                keyfilter="pint"
              />
            </div>

            <div className="col-12 md:col-6 pr-1 pl-1 md:mt-0 mt-3">
              <InputTextApp
                label="Grupo"
                name="classroom"
                id="classroom"
                className="w-full"
                icon="pi pi-pencil"
              />
            </div>
          </div>

          <div className="field pt-2 mt-3">
            <FormElement
              element={AutoCompleteProfessors}
              label="Tutor"
              id="professor"
              name="professor"
              disabled={!!student.id}
            />
          </div>

          <div className="field pt-2">
            <ToggleButtonApp
              name="active"
              onClassName="bg-green-500"
              offClassName="color-danger"
              onIcon="pi pi-lock"
              offIcon="pi pi-lock-open"
              onLabel="Activo"
              offLabel="Inactivo"
            />
          </div>

          <div className="flex flex-column">
            <Button
              type="submit"
              label={buttonLabel}
              className="mt-2 flex align-items-center justify-content-center"
              loading={isLoadingUpdate || isLoadingCreate}
              disabled={!isValid || isSubmitting || !dirty}
            />
          </div>
        </Form>
      )}
    </Formik>
  );
};

export default StudentDataForm;
