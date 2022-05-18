import { Form, Formik } from 'formik';
import { Button } from 'primereact/button';
import { Toast } from 'primereact/toast';
import * as Yup from 'yup';
import { MultiSelect } from 'primereact/multiselect';
import { VirtualScrollerLoadingTemplateOptions } from 'primereact/virtualscroller';
import { Skeleton } from 'primereact/skeleton';
import { FilterMatchMode } from 'primereact/api';
import { useState } from 'react';
import { useToast } from '../../../../hooks/useToast';
import { FormElement } from '../../../../components/forms/formElement/FormElement';
import { RequiredSubjects, SubjectUnion } from '../../../../interfaces/api';
import { useGetConsecutiveSubjectsQuery, useUpdateCorrelativeSubjectsMutation } from '../../../../redux/subject/subject.api';
import { useDropdownFilter } from '../../../../hooks/useDropdownFilter';
import { ucWords } from '../../../../utils/stringUtils';
import { processError, setSubjectFormErrors } from '../../../../utils/forms/handlerFormErrors';

const SkeletonDropdown = ({ even }: VirtualScrollerLoadingTemplateOptions) => (
  <div className="flex align-items-center p-2" style={{ height: '38px' }}>
    <Skeleton width={even ? '60%' : '50%'} height="1rem" />
  </div>
);

const processSubject = (requiredSubjects: SubjectUnion[]): RequiredSubjects[] => {
  const subjects = requiredSubjects.map((subject) => ({
    // eslint-disable-next-line no-underscore-dangle
    id: subject._id,
    name: ucWords(subject.name),
  }));

  return subjects;
};

interface Props {
    id: string,
    semester: number,
    correlativeSubjects: [SubjectUnion] | [],
}

export const CorrelativeSubjectForm = ({ id, semester, correlativeSubjects }: Props) => {
  const { toast, showSuccess, showError } = useToast();
  const [ skip, setSkip ] = useState<boolean>(true);

  const [ updateSubject, { isLoading: isLoadingUpdate }] = useUpdateCorrelativeSubjectsMutation();

  const {
    data, isLoading,
  } = useGetConsecutiveSubjectsQuery({
    page: '0',
    sortField: 'name',
    sortOrder: '1',
    filters: {
      _id: { value: id, matchMode: FilterMatchMode.NOT_EQUALS },
      semester: { value: semester, matchMode: FilterMatchMode.GREATER_THAN },
    },
    fields: 'name',
  }, { skip });

  const { cleanData, onFilter } = useDropdownFilter({
    field: 'name',
    data: data?.data,
  });

  return (
    <>
      <Toast ref={toast} />
      <Formik
        initialValues={{ correlativeSubjects: [ ...processSubject(correlativeSubjects) ]}}
        onSubmit={async (values, { setFieldError }) => {
          let correlativeSubjectsDB: string[] | [] = [];
          if (values.correlativeSubjects?.length) {
            correlativeSubjectsDB = values.correlativeSubjects.map((
              { id: subjectId }: RequiredSubjects,
            ) => subjectId);
          }

          const dataSend = {
            id,
            correlativeSubjects: correlativeSubjectsDB,
          };

          try {
            await updateSubject(dataSend).unwrap();
            setSkip(true);
            showSuccess({ detail: 'Se ha actualizadó las materias correlativas' });
          } catch (error) {
            const errors: string = processError({ error, showError });
            setSubjectFormErrors({ errors, setFieldError });
          }
        }}
        validationSchema={Yup.object({
          correlativeSubjects: Yup.array().nullable(true),
        })}
      >
        {

             ({
               isValid, isSubmitting, dirty, values,
             }) => (
               <Form>
                 <div className="field pt-2">
                   <FormElement
                     element={MultiSelect}
                     options={cleanData.length
                       ? [ ...cleanData ]
                       : [ ...processSubject(correlativeSubjects) ]
                       ?? []}
                     id="correlativeSubjects"
                     inputId="correlativeSubjects"
                     name="correlativeSubjects"
                     optionLabel="name"
                     label="Materias Correlativas"
                     filter
                     showClear
                     onFilter={onFilter}
                     showFilterClear
                     placeholder={cleanData[0]?.selectItemId === 'notFound'
                        && !!values.correlativeSubjects ? 'Seleccione una materia' : ''}
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

                 <div className="flex flex-column">
                   <Button
                     type="submit"
                     label="Actualizar Materias Correlativas"
                     className="mt-2 flex align-items-center justify-content-center"
                     disabled={!isValid || isSubmitting || !dirty}
                     loading={isLoadingUpdate}
                   />
                 </div>
               </Form>
             )
          }
      </Formik>
    </>
  );
};

export default CorrelativeSubjectForm;
