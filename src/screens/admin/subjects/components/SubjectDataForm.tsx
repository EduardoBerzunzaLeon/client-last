import { useState } from 'react';

import { Button } from 'primereact/button';
import { FilterMatchMode } from 'primereact/api';
import { Form, Formik } from 'formik';
import { Skeleton } from 'primereact/skeleton';
import { Toast } from 'primereact/toast';
import * as Yup from 'yup';

import { VirtualScrollerLoadingTemplateOptions } from 'primereact/virtualscroller';
import { DropdownApp } from '../../../../components/forms/dropdown/DropdownApp';
import { InputTextApp } from '../../../../components/forms';
import { SubjectDetail } from '../../../../interfaces/api';
import { ToggleButtonApp } from '../../../../components/forms/toggleButton/ToggleButtonApp';
import { useDropdownFilter } from '../../../../hooks/useDropdownFilter';
import { useGetConsecutiveSubjectsQuery } from '../../../../redux/subject/subject.api';
import { useToast } from '../../../../hooks/useToast';

const initialValues = {
  credit: 0,
  deprecated: false,
  name: '',
  semester: 0,
  consecutiveSubject: undefined,
};

interface Props {
  subject?: SubjectDetail,
}

const SkeletonDropdown = ({ even }: VirtualScrollerLoadingTemplateOptions) => (
  <div className="flex align-items-center p-2" style={{ height: '38px' }}>
    <Skeleton width={even ? '60%' : '50%'} height="1rem" />
  </div>
);

export const SubjectDataForm = ({ subject }: Props) => {
  const [ initialSubject ] = useState(subject ? {
    credit: subject.credit,
    deprecated: subject.deprecated,
    name: subject.name,
    semester: subject.semester,
    consecutiveSubject: subject.consecutiveSubject ? {
      name: subject.consecutiveSubject.name,
      // eslint-disable-next-line no-underscore-dangle
      id: subject.consecutiveSubject._id,
    } : undefined,
  } : initialValues);

  const [ skip, setSkip ] = useState<boolean>(true);
  const { toast } = useToast();

  const {
    data, isLoading,
  } = useGetConsecutiveSubjectsQuery({
    page: '0',
    sortField: 'name',
    sortOrder: '1',
    filters: { _id: { value: subject?.id, matchMode: FilterMatchMode.NOT_EQUALS }},
    fields: 'name',
  }, { skip });

  const { cleanData, onFilter } = useDropdownFilter({
    field: 'name',
    data: data?.data,
    emptyDataMessage: 'No se encontraron materias',
  });

  const onLazyLoad = () => {
    // TODO: Check this tomorrow
    if (cleanData.length) {
      const testing = cleanData.map((el) => {
        if (el.name === initialSubject?.consecutiveSubject?.id) {

        }
      });
    }

    setSkip(!!data);
  };

  return (
    <>
      <Toast ref={toast} />
      <Formik
        initialValues={initialSubject}
        onSubmit={(values: any) => {
          console.log(values);
        }}
        validationSchema={Yup.object({
          name: Yup.string()
            .required('Requerido'),
          semester: Yup.number()
            .required('Requerido').positive().integer()
            .min(1),
          credit: Yup.number()
            .required('Requerido').positive().integer()
            .min(1),
          deprecated: Yup.boolean()
            .required('Requerido'),
          consecutiveSubject: Yup.object(),
        })}
      >
        {
          ({
            values, isValid, isSubmitting, dirty,
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
              <div className="field pt-2">
                <DropdownApp
                  options={[ ...cleanData, { ...initialSubject.consecutiveSubject }]}
                  id="consecutiveSubject"
                  inputId="consecutiveSubject"
                  name="consecutiveSubject"
                  optionLabel="name"
                  label="Materia Consecutiva"
                  filter
                  showClear
                  onFilter={onFilter}
                  showFilterClear
                  placeholder={cleanData[0]?.selectItemId === 'notFound' && !!values.consecutiveSubject ? 'Seleccione una materia' : ''}
                  className="w-full"
                  virtualScrollerOptions={{
                    lazy: true,
                    onLazyLoad,
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

SubjectDataForm.defaultProps = {
  subject: undefined,
};

export default SubjectDataForm;
