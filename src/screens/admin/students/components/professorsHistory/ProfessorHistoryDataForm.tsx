import {
  useContext, useEffect, useState,
} from 'react';

import { Button } from 'primereact/button';
import { Calendar } from 'primereact/calendar';
import { Form, Formik } from 'formik';
import { InputTextarea } from 'primereact/inputtextarea';
import { skipToken } from '@reduxjs/toolkit/dist/query';
import { Toast } from 'primereact/toast';
import * as Yup from 'yup';

import { AutoCompleteProfessors } from '../professor/AutoCompleteProfessors';
import { FormElement } from '../../../../../components/forms/formElement/FormElement';
import { InputTextApp } from '../../../../../components/forms';
import { processError, setProfessorInHistoryFormErrors } from '../../../../../utils/forms/handlerFormErrors';
import { ProfessorInHistory } from '../../../../../interfaces/api';
import { ProfessorsHistoryContext } from './context/professorsHistoryContext';
import { StudentContext } from '../../context/studentContext';

import {
  useCreateProfessorInHistoryMutation,
  useGetProfessorsHistoryQuery,
  useUpdateProfessorInHistoryMutation,
} from '../../../../../redux/student/student.api';
import { useToast } from '../../../../../hooks/useToast';

const initialProfessor = {
  fullname: '',
  value: '',
  avatar: '',
};

interface Props {
  lastProfessor: ProfessorInHistory | undefined,
}

const setProfessorToAutocomplete = ({ professor }: ProfessorInHistory) => ({
  fullname: `${professor.name.first} ${professor.name.last}`,
  value: professor.id,
  avatar: professor.avatar,
});

export const ProfessorHistoryDataForm = ({ lastProfessor }: Props) => {
  const { professorSelected, setProfessorSelected } = useContext(ProfessorsHistoryContext);
  const { studentSelected } = useContext(StudentContext);

  const [ initialValues, setInitialValues ] = useState({
    currentProfessor: lastProfessor ? setProfessorToAutocomplete(lastProfessor).fullname : '',
    professor: initialProfessor,
    createdAt: new Date(),
    comments: '',
  });

  const [ createProfessor, { isLoading: isLoadingCreate }] = useCreateProfessorInHistoryMutation();
  const [ updateProfessor, { isLoading: isLoadingUpdate }] = useUpdateProfessorInHistoryMutation();
  const { toast, showSuccess, showError } = useToast();

  const {
    professorBefore,
  } = useGetProfessorsHistoryQuery(studentSelected?.id ?? skipToken, {
    selectFromResult: ({
      data,
    }) => ({
      professorBefore: data?.data.professorsHistory.find((
        professor,
      ) => professor.id === professorSelected?.idProfessorBefore),
    }),
  });

  useEffect(() => {
    if (professorBefore && professorSelected) {
      setInitialValues({
        professor: setProfessorToAutocomplete(professorSelected),
        currentProfessor: setProfessorToAutocomplete(professorBefore).fullname,
        createdAt: new Date(professorSelected.createdAt),
        comments: professorBefore.comments,
      });
    }

    if (!professorSelected) {
      setInitialValues({
        currentProfessor: `${lastProfessor?.professor?.name.first} ${lastProfessor?.professor?.name.last}` || '',
        professor: initialProfessor,
        createdAt: new Date(),
        comments: '',
      });
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [ professorBefore, professorSelected ]);

  return (
    <>
      <Toast ref={toast} />
      <h4>Agregar Tutor</h4>
      <Formik
        initialValues={initialValues}
        enableReinitialize
        onSubmit={async (values, { resetForm, setFieldError }) => {
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
            if (professorSelected) {
              const dataUpdate = {
                userId: dataSend.userId,
                professorHistoryId: professorSelected.id,
                professorId: newProfessorId,
                comments,
                createdAt,
                professorBeforeId: professorBefore?.id || '',
              };

              await updateProfessor(dataUpdate).unwrap();
              setInitialValues({ ...values });
            } else {
              await createProfessor(dataSend).unwrap();
              message = 'El tutor se agregó con éxito';
              resetForm();
            }
            showSuccess({ detail: message });
          } catch (error) {
            const errors: string = processError({ error, showError });
            setProfessorInHistoryFormErrors({ errors, setFieldError });
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

                <div className="flex flex-column sm:flex-row justify-content-between">
                  {
                    professorSelected && (
                    <Button
                      type="button"
                      label="Cancelar Actualización"
                      className="flex p-button-danger align-items-center justify-content-center w-full sm:w-6 mr-2 mb-2 sm:mb-0"
                      loading={isLoadingCreate || isLoadingUpdate}
                      onClick={() => setProfessorSelected(undefined)}
                    />
                    )
                  }

                  <Button
                    type="submit"
                    label={professorSelected ? 'Actualizar Tutor' : 'Cambiar Tutor'}
                    className={`flex align-items-center justify-content-center w-full ${!professorSelected ? '' : 'sm:w-6'}`}
                    disabled={!isValid || isSubmitting || !dirty}
                    loading={isLoadingCreate || isLoadingUpdate}
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
