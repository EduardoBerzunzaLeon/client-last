import { useState } from 'react';

import { Button } from 'primereact/button';
import { Form, Formik } from 'formik';
import { Toast } from 'primereact/toast';
import * as Yup from 'yup';

import { FilterMatchMode } from 'primereact/api';
import { VirtualScrollerLoadingTemplateOptions } from 'primereact/virtualscroller';
import { Skeleton } from 'primereact/skeleton';
import { MultiSelect } from 'primereact/multiselect';
import { FileSingleInputApp } from '../../../../components/forms/fileInput/FileSingleInputApp';
import { genderRadio } from '../../../../utils/forms/radioButtonObjects';
import { InputTextApp, RadioGroup } from '../../../../components/forms';
import { setAuthFormErrors, processError } from '../../../../utils/forms/handlerFormErrors';
import { ProfessorDetail, RequiredSubjects } from '../../../../interfaces/api';
import { useToast } from '../../../../hooks/useToast';
import { useCreateProfessorMutation, useUpdateProfessorMutation } from '../../../../redux/professor/professor.api';
import { useGetConsecutiveSubjectsQuery } from '../../../../redux/subject/subject.api';
import { useDropdownFilter } from '../../../../hooks/useDropdownFilter';
import { FormElement } from '../../../../components/forms/formElement/FormElement';
import { convertAdditionalSubjects } from '../assets/convertAdittionalSubjects';
import { ToggleButtonApp } from '../../../../components/forms/toggleButton/ToggleButtonApp';

const SkeletonDropdown = ({ even }: VirtualScrollerLoadingTemplateOptions) => (
  <div className="flex align-items-center p-2" style={{ height: '38px' }}>
    <Skeleton width={even ? '60%' : '50%'} height="1rem" />
  </div>
);

interface Generic {
  [x: string]: any
}

const convertModelToFormData = (model: Generic, form?: FormData, namespace = ''): FormData => {
  const formData = form || new FormData();

  if (typeof model === 'string') {
    formData.append(namespace, model);
  } else {
    Object.keys(model).forEach((key) => {
      if (!model[key]) {
        return;
      }
      const formKey = namespace ? `${namespace}` : key;
      if (model[key] instanceof Date) {
        formData.append(formKey, model[key].toISOString());
      } else if (model[key] instanceof Array) {
        model[key].forEach((element: any, index: number) => {
          const tempFormKey = `${formKey}[${index}]`;
          convertModelToFormData(element, formData, tempFormKey);
        });
      } else if (typeof model[key] === 'object' && !(model[key] instanceof File)) {
        convertModelToFormData(model[key], formData, formKey);
      } else if (model[key] instanceof File) {
        formData.append(formKey, model[key]);
      } else {
        formData.append(formKey, model[key].toString());
      }
    });
  }

  return formData;
};

const uploadOptions = { icon: 'pi pi-fw pi-cloud-upload', iconOnly: true, className: 'hidden' };

export const ProfessorDataForm = ({ professor }: { professor: ProfessorDetail }) => {
  const [ updateProfessor, { isLoading: isLoadingUpdate }] = useUpdateProfessorMutation();
  const [ createProfessor, { isLoading: isLoadingCreate }] = useCreateProfessorMutation();

  const [ initialProfessor, setInitialProfessor ] = useState({
    first: professor.name.first,
    last: professor.name.last,
    gender: professor.gender,
    email: professor.email,
    active: professor.active,
    avatar: null,
    subjects: professor.subjects
      ? convertAdditionalSubjects(professor.subjects)
      : undefined,
  });

  const [ skip, setSkip ] = useState<boolean>(true);

  const {
    data, isLoading,
  } = useGetConsecutiveSubjectsQuery({
    page: 0,
    sortField: 'name',
    sortOrder: 1,
    fields: 'name',
    filters: {
      id: { value: 1, matchMode: FilterMatchMode.NOT_EQUALS },
    },
  }, { skip });

  const { toast, showError, showSuccess } = useToast();

  const { cleanData, onFilter } = useDropdownFilter({
    field: 'name',
    data: data?.data,
  });

  return (
    <>
      <Toast ref={toast} />

      <Formik
        initialValues={initialProfessor}
        enableReinitialize
        onSubmit={async (values, { setFieldError, resetForm }) => {
          const { subjects, ...rest } = values;

          let subjectsDB: string[] | [] = [];
          if (subjects?.length) {
            subjectsDB = subjects.map((
              { id }: RequiredSubjects,
            ) => id);
          }

          const prepareData = { subjects: subjectsDB, id: professor?.id || '', ...rest };
          const dataSend = convertModelToFormData(prepareData);

          let message = 'El profesor se actualizó con éxito';

          try {
            if (professor?.id) {
              await updateProfessor(dataSend).unwrap();
              setInitialProfessor({ ...values });
            } else {
              await createProfessor(dataSend).unwrap();
              message = 'El profesor se creó con éxito';
              resetForm();
            }

            showSuccess({ detail: message });
          } catch (error) {
            const errors: string = processError({ error, showError });
            setAuthFormErrors({ errors, setFieldError });
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
          subjects: Yup.array().nullable(true),
        })}
      >
        {({
          values, isValid, isSubmitting, dirty, setFieldValue,
        }) => (
          <Form>
            <FileSingleInputApp
              onChange={(primeFile) => {
                setFieldValue('avatar', primeFile);
              }}
              initialValue={professor?.avatar ?? values?.avatar ?? ''}
              isLoading={isLoadingUpdate || isLoadingCreate}
              uploadOptions={uploadOptions}
            />
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

            <div className="field pt-2">
              <FormElement
                element={MultiSelect}
                options={cleanData.length
                  ? [ ...cleanData ]
                  : initialProfessor.subjects
                    ?? []}
                id="subjects"
                inputId="subjects"
                name="subjects"
                optionLabel="name"
                label="Materias Impartidas"
                filter
                showClear
                onFilter={onFilter}
                showFilterClear
                placeholder={cleanData[0]?.selectItemId === 'notFound' && !!values.subjects ? 'Seleccione una materia' : ''}
                className="w-full"
                display="chip"
                emptyFilterMessage="Materias no encontradas"
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

            <div className="field pt-2">
              <ToggleButtonApp
                name="blocked"
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
                label="Cambiar Datos Personales"
                className="mt-2 flex align-items-center justify-content-center"
                loading={isLoadingUpdate || isLoadingCreate}
                disabled={!isValid || isSubmitting || !dirty}
              />
            </div>

          </Form>
        )}
      </Formik>
    </>
  );
};

export default ProfessorDataForm;
