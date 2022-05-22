import { Form, Formik } from 'formik';
import { Button } from 'primereact/button';
import { Calendar } from 'primereact/calendar';
import { Toast } from 'primereact/toast';
import { useState } from 'react';
import * as Yup from 'yup';
import { InputTextApp } from '../../../../components/forms';
import { useToast } from '../../../../hooks/useToast';

const initialCourse = {
  name: '',
  impartedAt: '',
};

export const CourseDataForm = () => {
  const [ date3, setDate3 ] = useState<Date | Date[] | undefined>(undefined);
  const { toast } = useToast();
  return (
    <div>
      <Toast ref={toast} />
      <h4>Nuevo Curso</h4>
      <Formik
        initialValues={initialCourse}
        onSubmit={() => { console.log('submitting'); }}
        validationSchema={Yup.object({
          name: Yup.string()
            .required('Requerido'),
          impartedAt: Yup.string()
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
              <label htmlFor="impartedAt">Impartido el</label>
              <Calendar id="impartedAt" value={date3} onChange={(e) => setDate3(e.value)} showIcon className="w-full" />
            </div>

            <div className="flex flex-column">
              <Button
                type="submit"
                label="Agregar Curso"
                className="mt-2 flex align-items-center justify-content-center"
                disabled={!isValid || isSubmitting || !dirty}
              />
            </div>
          </Form>
        )}
      </Formik>

    </div>
  );
};

export default CourseDataForm;
