import { Form, Formik } from 'formik';
// import { FilterMatchMode } from 'primereact/api';
// import { Dropdown } from 'primereact/dropdown';
import { Toast } from 'primereact/toast';
import { useState } from 'react';
import * as Yup from 'yup';
import { InputTextApp } from '../../../../components/forms';
import { DropdownApp } from '../../../../components/forms/dropdown/DropdownApp';
import { ToggleButtonApp } from '../../../../components/forms/toggleButton/ToggleButtonApp';
import { useToast } from '../../../../hooks/useToast';
import { SubjectDetail } from '../../../../interfaces/api';
// import { useGetSubjectsQuery } from '../../../../redux/subject/subject.api';

const initialValues = {
  credit: 0,
  deprecated: false,
  name: '',
  semester: 0,
  consecutiveSubject: undefined,
};

const countries = [
  { name: 'Australia', code: 'AU' },
  { name: 'Brazil', code: 'BR' },
  { name: 'China', code: 'CN' },
  { name: 'Egypt', code: 'EG' },
  { name: 'France', code: 'FR' },
  { name: 'Germany', code: 'DE' },
  { name: 'India', code: 'IN' },
  { name: 'Japan', code: 'JP' },
  { name: 'Spain', code: 'ES' },
  { name: 'United States', code: 'US' },
];

export const SubjectDataForm = ({ subject }: {subject?: SubjectDetail}) => {
  const [ initialSubject ] = useState(subject ? {
    credit: subject.credit,
    deprecated: subject.deprecated,
    name: subject.name,
    semester: subject.semester,
    consecutiveSubject: subject.consecutiveSubject,
  } : initialValues);

  const [ selectedCountry, setSelectedCountry ] = useState<any>(null);

  const { toast } = useToast();

  // const {
  //   data,
  // } = useGetSubjectsQuery({
  //   page: '0',
  //   sortField: 'name',
  //   sortOrder: '1',
  //   filters: { _id: { value: subject?.id, matchMode: FilterMatchMode.NOT_EQUALS }},
  //   fields: 'name',
  // }, { skip: true });

  const onCountryChange = (e: {value: any}) => {
    setSelectedCountry(e.value);
  };

  const onSubjectShow = (e: any) => {
    console.log(e);
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
          () => (
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
                  value={selectedCountry}
                  options={countries}
                  onChange={onCountryChange}
                  onShow={onSubjectShow}
                  id="consecutiveSubject"
                  inputId="consecutiveSubject"
                  name="consecutiveSubject"
                  optionLabel="name"
                  label="Materia Consecutiva"
                  filter
                  showClear
                  filterBy="name"
                  className="w-full"
                />
              </div>

              {/* <Dropdown value={selectedItem2} options={lazyItems}
              // onChange={onLazyItemChange}
              virtualScrollerOptions={{ lazy: true, onLazyLoad: onLazyLoad,
                itemSize: 38, showLoader: true,
                loading: lazyLoading, delay: 250, loadingTemplate: (options) => {
                    return (
                        <div className="flex align-items-center p-2" style={{ height: '38px' }}>
                            <Skeleton width={options.even ? '60%' : '50%'} height="1rem" />
                        </div>
                    )}
                }} placeholder="Select Item"/> */}

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
