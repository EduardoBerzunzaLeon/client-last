import { Form, Formik } from 'formik';
import { Button } from 'primereact/button';
import { Calendar } from 'primereact/calendar';
import { Toast } from 'primereact/toast';
import * as Yup from 'yup';
import { InputTextApp } from '../../../../../components/forms';
import { FormElement } from '../../../../../components/forms/formElement/FormElement';
import { useToast } from '../../../../../hooks/useToast';
import { CreateCourseRequest } from '../../../../../interfaces/api';
import { useCreateCourseMutation } from '../../../../../redux/course/course.api';
import { processError, setSubjectFormErrors } from '../../../../../utils/forms/handlerFormErrors';

const initialCourse = {
  name: '',
  impartedAt: new Date(),
};

export const CourseDataForm = ({ professorId }: { professorId?: string}) => {
  const [ createCourse, { isLoading: isLoadingCreate }] = useCreateCourseMutation();

  const { toast, showSuccess, showError } = useToast();
  return (
    <div>
      <Toast ref={toast} />
      <h4>Nuevo Curso</h4>
      <Formik
        initialValues={initialCourse}
        onSubmit={async (values, { setFieldError, resetForm }) => {
          if (professorId) {
            const dataSend: CreateCourseRequest = { ...values, user: professorId };

            try {
              await createCourse(dataSend).unwrap();
              resetForm();

              showSuccess({ detail: 'Curso creado con exitó' });
            } catch (error) {
              const errors: string = processError({ error, showError });
              setSubjectFormErrors({ errors, setFieldError });
            }
          }
        }}
        validationSchema={Yup.object({
          name: Yup.string()
            .required('Requerido'),
          impartedAt: Yup.date()
            .required('Requerido'),
        })}
      >
        {({ isValid, isSubmitting, dirty }) => (
          <Form>
            <div className="field pt-2 mt-4">
              <InputTextApp
                label="Nombre*"
                id="name"
                name="name"
                className="w-full"
                icon="pi pi-book"
              />
            </div>

            <div className="field pt-2 mt-4">
              <FormElement
                element={Calendar}
                label="Impartido el*"
                name="impartedAt"
                id="impartedAt"
                showIcon
                className="w-full"
              />
            </div>

            <div className="flex flex-column">
              <Button
                type="submit"
                label="Agregar Curso"
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

CourseDataForm.defaultProps = {
  professorId: '',
};

export default CourseDataForm;
