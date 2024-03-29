import { useContext, useState } from 'react';

import { Button } from 'primereact/button';
import { FilterMatchMode } from 'primereact/api';
import { Form, Formik } from 'formik';
import { MultiSelect } from 'primereact/multiselect';
import * as Yup from 'yup';

import {
  convertAdditionalSubjects,
  convertModelToFormData,
  processError,
  setProfessorFormErrors,
  genderRadio,
} from '../../../utils';
import {
  FileSingleInputApp,
  uploadOptions,
  InputTextApp,
  RadioGroup,
  FormElement,
  ToggleButtonApp,
} from '../../forms';
import { Paginator, ProfessorDetail, RequiredSubjects } from '../../../interfaces';
import { SkeletonDropdown } from '../../ui';
import { ToastContext } from '../../../context';

import { useGetConsecutiveSubjectsQuery } from '../../../redux/subject/subject.api';
import { useDropdownFilter } from '../../../hooks';
import { useUpdateProfessorMutation, useCreateProfessorMutation } from '../../../redux/professor/professor.api';

const initialFilters: Paginator = {
  page: 0,
  sortField: 'name',
  sortOrder: 1,
  fields: 'name',
  rows: 100,
  filters: {
    id: { value: 1, matchMode: FilterMatchMode.NOT_EQUALS },
  },
};

interface Props {
  buttonLabel: string,
  professor: ProfessorDetail,
}

export const ProfessorDataForm = ({ professor, buttonLabel }: Props) => {
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
  const { showSuccess, showError } = useContext(ToastContext);

  const {
    data, isLoading,
  } = useGetConsecutiveSubjectsQuery(initialFilters, { skip });

  const { cleanData } = useDropdownFilter({
    field: 'name',
    data: data?.data,
  });

  return (
    <Formik
      initialValues={initialProfessor}
      enableReinitialize
      onSubmit={async (values, { setFieldError, resetForm }) => {
        const { subjects, active, ...rest } = values;

        let subjectsDB: string[] | [] = [];
        if (subjects?.length) {
          subjectsDB = subjects.map((
            { id }: RequiredSubjects,
          ) => id);
        }

        const prepareData = {
          subjects: subjectsDB, id: professor?.id || '', active: `${active}`, ...rest,
        };

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
          setProfessorFormErrors({ errors, setFieldError });
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

export default ProfessorDataForm;
