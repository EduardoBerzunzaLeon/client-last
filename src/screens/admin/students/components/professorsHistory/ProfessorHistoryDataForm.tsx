import { Form, Formik } from 'formik';
import { Button } from 'primereact/button';
import { Calendar } from 'primereact/calendar';
import * as Yup from 'yup';
import { InputTextarea } from 'primereact/inputtextarea';
import { useContext, useState } from 'react';
import { Toast } from 'primereact/toast';
import { InputTextApp } from '../../../../../components/forms';
import { FormElement } from '../../../../../components/forms/formElement/FormElement';
import { AutoCompleteProfessors } from '../professor/AutoCompleteProfessors';
// import { ProfessorsHistoryContext } from './context/professorsHistoryContext';
import { ProfessorInHistory } from '../../../../../interfaces/api';
import { useCreateProfessorInHistoryMutation } from '../../../../../redux/student/student.api';
import { StudentContext } from '../../context/studentContext';
import { useToast } from '../../../../../hooks/useToast';

const initialProfessor = {
  fullname: '',
  value: '',
  avatar: '',
};

interface Props {
  lastProfessor: ProfessorInHistory | undefined,
}

export const ProfessorHistoryDataForm = ({ lastProfessor }: Props) => {
  // const {
  //   professorSelected,
  // } = useContext(ProfessorsHistoryContext);
  const { toast, showSuccess } = useToast();

  const {
    studentSelected,
  } = useContext(StudentContext);

  const [ initialValues ] = useState({
    currentProfessor:
      `${lastProfessor?.professor?.name.first} ${lastProfessor?.professor?.name.last}`
      || '',
    professor: initialProfessor,
    createdAt: new Date(),
    comments: '',
  });

  const [ createProfessor, { isLoading: isLoadingCreate }] = useCreateProfessorInHistoryMutation();

  return (
    <>
      <Toast ref={toast} />
      <h4>Agregar Tutor</h4>
      <Formik
        initialValues={initialValues}
        onSubmit={async (values, { resetForm }) => {
          const { professor: { value: newProfessorId }, createdAt, comments } = values;
          const dataSend = {
            newProfessorId,
            userId: studentSelected?.id ?? '',
            currentProfessorHistoryId: lastProfessor?.id ?? '',
            createdAt,
            comments,
          };

          let message = 'El alumno se actualizó con éxito';

          try {
            if (false) {
            //   await updateStudent(dataSend).unwrap();
            //   setInitialStudent({ ...values });
            } else {
              await createProfessor(dataSend).unwrap();
              message = 'El tutor se agregó con éxito';
              resetForm();
            }
            showSuccess({ detail: message });
          } catch (error) {
            console.log(error);
            // const errors: string = processError({ error, showError });
            // setStudentFormErrors({ errors, setFieldError });
          }
        }}
        validationSchema={Yup.object({
          currentProfessor: Yup.string()
            .required('Requerido'),
          professor: Yup.object()
            .required('Requerido').nullable(),
          comments: Yup.string()
            .required('Requerido'),
          createdAt: Yup.date()
            .required('Requerido'),
        })}
      >
        {
            ({
              isValid, isSubmitting, dirty,
            }) => (
              <Form>
                <div className="field pt-3">
                  <InputTextApp
                    label="Tutor Actual"
                    name="currentProfessor"
                    id="currentProfessor"
                    className="w-full"
                    icon="pi pi-user"
                    disabled
                  />
                </div>
                <div className="field pt-2 mt-3">
                  <FormElement
                    element={AutoCompleteProfessors}
                    label="Tutor"
                    id="professor"
                    name="professor"
                  />
                </div>
                <div className="field pt-2 mt-4">
                  <FormElement
                    element={Calendar}
                    label="Cambio realizado el dia*"
                    name="createdAt"
                    id="createdAt"
                    showIcon
                    className="w-full"
                  />
                </div>
                <div className="field pt-4">
                  <FormElement
                    element={InputTextarea}
                    label="Comentarios de la baja"
                    name="comments"
                    id="comments"
                    icon="pi pi-comments"
                    className="w-full"
                  />
                </div>

                <div className="flex flex-column">
                  <Button
                    type="submit"
                    label="Agregar Tutor"
                    className="mt-2 flex align-items-center justify-content-center"
                    disabled={!isValid || isSubmitting || !dirty}
                    loading={isLoadingCreate}
                  />
                </div>
              </Form>
            )
        }
      </Formik>

    </>
  );
};

export default ProfessorHistoryDataForm;
