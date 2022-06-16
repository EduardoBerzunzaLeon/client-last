import { Form, Formik } from 'formik';
import { Button } from 'primereact/button';
import { Toast } from 'primereact/toast';
import * as Yup from 'yup';
import { Divider } from '../../../../components/divider/Divider';
import { InputTextApp, RadioGroup } from '../../../../components/forms';
import { uploadOptions } from '../../../../components/forms/fileInput/buttonOptions';
import { FileSingleInputApp } from '../../../../components/forms/fileInput/FileSingleInputApp';
import { FormElement } from '../../../../components/forms/formElement/FormElement';
import { ToggleButtonApp } from '../../../../components/forms/toggleButton/ToggleButtonApp';
import { useToast } from '../../../../hooks/useToast';

import { StudentResume } from '../../../../interfaces/api';
import { useCreateStudentMutation } from '../../../../redux/student/student.api';
import { convertModelToFormData } from '../../../../utils/convertModelToFormData';
import { processError, setStudentFormErrors } from '../../../../utils/forms/handlerFormErrors';
import { genderRadio } from '../../../../utils/forms/radioButtonObjects';

import { AutoCompleteProfessors } from './professor/AutoCompleteProfessors';

interface Props {
    student: StudentResume | undefined;
}

const initialValues = {
  first: '',
  last: '',
  email: '',
  gender: null,
  enrollment: '',
  avatar: null,
  currentSemester: 1,
  classroom: 'A',
  active: true,
  professor: {
    fullname: '',
    value: '',
    avatar: '',
  },
};

export const StudentDataForm = ({ student }: Props) => {
  const [ createStudent, { isLoading: isLoadingCreate }] = useCreateStudentMutation();

  const { toast, showSuccess, showError } = useToast();

  return (
    <div>
      <Toast ref={toast} />
      <Formik
        initialValues={initialValues}
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
            active: `${active}`,
            ...personalData,
          };

          const dataSend = convertModelToFormData(prepareData);
          let message = 'El alumno se actualizó con éxito';

          try {
            if (student) {
              console.log(student);
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
              initialValue={values?.avatar ?? ''}
              uploadOptions={uploadOptions}
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

              <div className="col-12 md:col-6 pr-1 pl-1">
                <InputTextApp
                  label="Grupo"
                  name="classroom"
                  id="classroom"
                  className="w-full"
                  icon="pi pi-pencil"
                />
              </div>
            </div>

            <div className="field pt-2 mt-2">
              <FormElement
                element={AutoCompleteProfessors}
                label="Tutor"
                id="professor"
                name="professor"
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
                label="Testing"
                className="mt-2 flex align-items-center justify-content-center"
                loading={isLoadingCreate}
                disabled={!isValid || isSubmitting || !dirty}
              />
            </div>
          </Form>
        )}
      </Formik>
    </div>

  );
};

export default StudentDataForm;
