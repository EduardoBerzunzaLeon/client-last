import { useState } from 'react';

import { Button } from 'primereact/button';
import { Dropdown } from 'primereact/dropdown';
import { Form, Formik } from 'formik';
// import { Toast } from 'primereact/toast';
import * as Yup from 'yup';

import { FormElement, InputTextApp } from '../../forms';
import { InitialValues, PhaseStatus } from '../../../interfaces';
import { processError, setSubjectInHistoryFormErrors } from '../../../utils';
import { SkeletonDropdown } from '../../ui';

import {
  useCreateSubjectinHistoryMutation,
  useGetPossibleSubjectsQuery,
  useUpdateSubjectPhaseMutation,
} from '../../../redux/subjectHistory/subjectHistory.api';
import { useDropdownFilter, useToast } from '../../../hooks';
import { PortalToast } from './PortalToast';

interface PhaseStatusDropdown {
  name: string,
  code: PhaseStatus
}

const phasesStatus: PhaseStatusDropdown[] = [
  { name: 'Cursando', code: 'cursando' },
  { name: 'Aprobado', code: 'aprobado' },
  { name: 'Reprobado', code: 'reprobado' },
];

interface Props {
    initialValues: InitialValues,
    buttonLabel: string,
}

export const PhaseDataForm = ({ initialValues, buttonLabel }: Props) => {
  const { phaseId, userId, ...formValues } = initialValues;
  const [ skip, setSkip ] = useState<boolean>(true);
  const [ initialPhase, setInitialPhase ] = useState(formValues);

  const { data, isLoading } = useGetPossibleSubjectsQuery(userId, { skip });
  const [ createPhase, { isLoading: isLoadingCreate }] = useCreateSubjectinHistoryMutation();
  const [ updatePhase, { isLoading: isLoadingUpdate }] = useUpdateSubjectPhaseMutation();
  const { toast, showSuccess, showError } = useToast();

  const { cleanData, onFilter } = useDropdownFilter({
    field: 'name',
    data: data?.data,
  });

  return (
    <div className="formgrid">
      <PortalToast ref={toast} />
      <Formik
        initialValues={initialPhase}
        enableReinitialize
        onSubmit={async (values, { setFieldError, resetForm }) => {
          const genericSend = {
            semester: values.semester,
            phaseStatus: (values.phaseStatus.code as PhaseStatus),
          };

          let message = 'La fase se actualizó con éxito';

          try {
            if (phaseId !== '') {
              const dataSend = {
                ...genericSend,
                phaseId,
              };
              await updatePhase({ ...dataSend }).unwrap();
              setInitialPhase({ ...values });
            } else {
              const dataSend = {
                ...genericSend,
                userId,
                subjectId: values.subject!._id,
              };
              await createPhase({ ...dataSend }).unwrap();
              message = 'La fase se creó con éxito';
              resetForm();
            }
            setSkip(true);
            showSuccess({ detail: message });
          } catch (error) {
            const errors: string = processError({ error, showError });
            setSubjectInHistoryFormErrors({ errors, setFieldError });
          }
        }}
        validationSchema={Yup.object({
          subject: Yup.object().required('Requerido'),
          phaseStatus: Yup.object()
            .required('Requerido'),
          semester: Yup.number()
            .required('Requerido').positive().integer()
            .min(1, 'El semestre debe tener valor entre 1 y 13')
            .max(13, 'El semestre debe tener valor entre 1 y 13'),
        })}
      >
        {
            ({ isValid, isSubmitting, dirty }) => (
              <Form>
                <div className="field pt-2 mt-4">
                  <InputTextApp
                    label="Semestre*"
                    id="semester"
                    name="semester"
                    className="w-full"
                    icon="pi pi-pencil"
                    keyfilter="pint"
                    disabled
                  />
                </div>
                <div className="field pt-2 mt-4">
                  <FormElement
                    element={Dropdown}
                    id="subject"
                    inputId="subject"
                    name="subject"
                    options={initialValues.subject ? [ initialValues.subject ] : [ ...cleanData ]}
                    optionLabel="name"
                    className="w-full"
                    label="Materia"
                    filter
                    showClear
                    onFilter={onFilter}
                    showFilterClear
                    filterBy="name"
                    emptyFilterMessage="Materias no encontradas"
                    disabled={initialValues.subject}
                    virtualScrollerOptions={{
                      lazy: true,
                      onLazyLoad: () => {
                        setSkip(false);
                      },
                      itemSize: 1,
                      showLoader: true,
                      loading: isLoading,
                      loadingTemplate: SkeletonDropdown,
                    }}
                  />
                </div>
                <div className="field pt-2 mt-4">
                  <FormElement
                    element={Dropdown}
                    id="phaseStatus"
                    inputId="phaseStatus"
                    name="phaseStatus"
                    options={phasesStatus}
                    optionLabel="name"
                    className="w-full"
                    label="Núcleo"
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
            )
        }
      </Formik>
    </div>
  );
};

export default PhaseDataForm;
