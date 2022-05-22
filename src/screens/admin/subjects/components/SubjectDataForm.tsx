import React, { useState } from 'react';

import { Button } from 'primereact/button';
import { Dropdown } from 'primereact/dropdown';
import { FilterMatchMode } from 'primereact/api';
import { Form, Formik } from 'formik';
import { MultiSelect } from 'primereact/multiselect';
import { Skeleton } from 'primereact/skeleton';
import { Toast } from 'primereact/toast';
import { VirtualScrollerLoadingTemplateOptions } from 'primereact/virtualscroller';
import * as Yup from 'yup';

import { convertAdditionalSubjects } from '../assets/convertAdditionalSubjects';
import { FormElement } from '../../../../components/forms/formElement/FormElement';
import { InputTextApp } from '../../../../components/forms';
import { processError, setSubjectFormErrors } from '../../../../utils/forms/handlerFormErrors';
import { RequiredSubjects, SubjectDetail } from '../../../../interfaces/api';
import { ToggleButtonApp } from '../../../../components/forms/toggleButton/ToggleButtonApp';

import { useCreateSubjectMutation, useGetConsecutiveSubjectsQuery, useUpdateSubjectMutation } from '../../../../redux/subject/subject.api';
import { useDropdownFilter } from '../../../../hooks/useDropdownFilter';
import { useToast } from '../../../../hooks/useToast';

interface Props {
  subject: SubjectDetail,
}

const SkeletonDropdown = ({ even }: VirtualScrollerLoadingTemplateOptions) => (
  <div className="flex align-items-center p-2" style={{ height: '38px' }}>
    <Skeleton width={even ? '60%' : '50%'} height="1rem" />
  </div>
);

const cores = [
  { name: 'Básico', code: 'básico' },
  { name: 'Sustantivo', code: 'sustantivo' },
  { name: 'Integral', code: 'integral' },
];

export const SubjectDataForm = ({ subject }: Props) => {
  const [ initialSubject, setInitialSubject ] = useState({
    credit: subject.credit,
    deprecated: subject.deprecated,
    name: subject.name,
    semester: subject.semester,
    core: { name: subject.core, code: subject?.core.toLowerCase() },
    practicalHours: subject.practicalHours,
    theoreticalHours: subject.theoreticalHours,
    requiredSubjects: subject.requiredSubjects
      ? convertAdditionalSubjects(subject.requiredSubjects)
      : undefined,
  });

  const [ skip, setSkip ] = useState<boolean>(true);
  const [ semester, setSemester ] = useState(subject.semester);
  const { toast, showSuccess, showError } = useToast();

  const [ createSubject, { isLoading: isLoadingCreate }] = useCreateSubjectMutation();
  const [ updateSubject, { isLoading: isLoadingUpdate }] = useUpdateSubjectMutation();

  const {
    data, isLoading,
  } = useGetConsecutiveSubjectsQuery({
    page: 0,
    sortField: 'name',
    sortOrder: 1,
    filters: {
      _id: { value: subject?.id, matchMode: FilterMatchMode.NOT_EQUALS },
      semester: { value: semester || 1, matchMode: FilterMatchMode.LESS_THAN },
    },
    fields: 'name',
  }, { skip });

  const { cleanData, setCleanData, onFilter } = useDropdownFilter({
    field: 'name',
    data: data?.data,
  });

  return (
    <>
      <Toast ref={toast} />
      <Formik
        initialValues={initialSubject}
        enableReinitialize
        onSubmit={async (values, { setFieldError, resetForm }) => {
          const { core, requiredSubjects, ...rest } = values;
          const { code: coreDB } = core;

          let requiredSubjectsDB: string[] | [] = [];
          if (requiredSubjects?.length) {
            requiredSubjectsDB = requiredSubjects.map((
              { id }: RequiredSubjects,
            ) => id);
          }

          const dataSend = {
            core: coreDB,
            requiredSubjects: requiredSubjectsDB,
            ...rest,
          };
          let message = 'La materia se actualizó con éxito';

          try {
            if (subject.id) {
              await updateSubject({ id: subject.id, ...dataSend }).unwrap();
              setInitialSubject({ ...values });
            } else {
              await createSubject(dataSend).unwrap();
              message = 'La materia se creó con éxito';
              resetForm();
            }
            setSkip(true);
            showSuccess({ detail: message });
          } catch (error) {
            const errors: string = processError({ error, showError });
            setSubjectFormErrors({ errors, setFieldError });
          }
        }}
        validationSchema={Yup.object({
          name: Yup.string()
            .required('Requerido'),
          semester: Yup.number()
            .required('Requerido').positive().integer()
            .min(1, 'El semestre debe tener valor entre 1 y 9')
            .max(9, 'El semestre debe tener valor entre 1 y 9'),
          credit: Yup.number()
            .required('Requerido').positive().integer()
            .min(1, 'Los créditos debe ser mayor o igual a 1'),
          practicalHours: Yup.number()
            .required('Requerido').positive().integer()
            .min(0, 'El semestre debe tener valor entre 0 y 5')
            .max(5, 'El semestre debe tener valor entre 0 y 5'),
          theoreticalHours: Yup.number()
            .required('Requerido').positive().integer()
            .min(0, 'El semestre debe tener valor entre 0 y 5')
            .max(5, 'El semestre debe tener valor entre 0 y 5')
            .when('practicalHours', (
              practicalHours: number,
              schema,
            ) => schema.test({
              test: (theoreticalHours: number) => ((practicalHours || 0) + theoreticalHours) <= 5,
              message: 'La suma de horas no puede ser mayor a 5',
            })),
          core: Yup.object()
            .required('Requerido'),
          deprecated: Yup.boolean()
            .required('Requerido'),
          requiredSubjects: Yup.array().nullable(true),
        })}
      >
        {
          ({
            values, isValid, isSubmitting, dirty, setFieldValue, handleChange,
          }) => (
            <Form>

              <div className="field pt-2 mt-4">
                <InputTextApp
                  label="Materia*"
                  id="name"
                  name="name"
                  className="w-full"
                  icon="pi pi-book"
                />
              </div>
              <div className="field pt-2 mt-4">
                <InputTextApp
                  label="Semestre*"
                  id="semester"
                  name="semester"
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                    setFieldValue('requiredSubjects', []);
                    handleChange(e);
                  }}
                  className="w-full"
                  icon="pi pi-pencil"
                  keyfilter="pint"
                />
              </div>
              <div className="field pt-2 mt-4">
                <InputTextApp
                  label="Creditos*"
                  id="credit"
                  name="credit"
                  className="w-full"
                  icon="pi pi-pencil"
                  keyfilter="pint"
                />
              </div>

              <div className="field pt-2 mt-4">
                <InputTextApp
                  label="Horas Practicas"
                  id="practicalHours"
                  name="practicalHours"
                  className="w-full"
                  icon="pi pi-pencil"
                  keyfilter="pint"
                />
              </div>

              <div className="field pt-2 mt-4">
                <InputTextApp
                  label="Horas Teoricas"
                  id="theoreticalHours"
                  name="theoreticalHours"
                  className="w-full"
                  icon="pi pi-pencil"
                  keyfilter="pint"
                />
              </div>

              <div className="field pt-2">
                <FormElement
                  element={Dropdown}
                  id="core"
                  inputId="core"
                  name="core"
                  options={cores}
                  optionLabel="name"
                  className="w-full"
                  label="Núcleo"
                />
              </div>

              <div className="field pt-2">
                <FormElement
                  element={MultiSelect}
                  options={cleanData.length || semester !== initialSubject.semester
                    ? [ ...cleanData ]
                    : initialSubject.requiredSubjects
                    ?? []}
                  id="requiredSubjects"
                  inputId="requiredSubjects"
                  name="requiredSubjects"
                  optionLabel="name"
                  label="Materias Requeridas"
                  filter
                  showClear
                  onFilter={onFilter}
                  showFilterClear
                  placeholder={cleanData[0]?.selectItemId === 'notFound' && !!values.requiredSubjects ? 'Seleccione una materia' : ''}
                  className="w-full"
                  display="chip"
                  emptyFilterMessage="Materias no encontradas"
                  virtualScrollerOptions={{
                    lazy: true,
                    onLazyLoad: () => {
                      if (!values.semester) {
                        setCleanData([]);
                      }
                      setSemester(Number(values?.semester || 1));
                      setSkip(false);
                    },
                    itemSize: 1,
                    showLoader: true,
                    loading: isLoading,
                    loadingTemplate: SkeletonDropdown,
                  }}
                />
              </div>

              <div className="field pt-2">
                <ToggleButtonApp
                  name="deprecated"
                  onClassName="color-danger"
                  offClassName="bg-green-500"
                  onIcon="pi pi-exclamation-triangle"
                  offIcon="pi pi-thumbs-up"
                  onLabel="Deprecado"
                  offLabel="Activo"
                />
              </div>
              <div className="flex flex-column">
                <Button
                  type="submit"
                  label="Crear / Guardar Materia"
                  className="mt-2 flex align-items-center justify-content-center"
                  loading={isLoadingCreate || isLoadingUpdate}
                  disabled={!isValid || isSubmitting || !dirty}
                />
              </div>
            </Form>
          )
        }
      </Formik>
    </>
  );
};

export default SubjectDataForm;
