import React from 'react';

import { Button } from 'primereact/button';
import { Dropdown } from 'primereact/dropdown';
import { Form, Formik } from 'formik';
import * as Yup from 'yup';

import { FormElement, InputTextApp } from '../../forms';
import { InitialValues } from '../../../interfaces';

const phasesStatus = [
  { name: 'cursando', code: 'cursando' },
  { name: 'aprobado', code: 'aprobado' },
  { name: 'reprobado', code: 'reprobado' },
];

interface Props {
    initialValues: InitialValues,
    buttonLabel: string,
}

export const PhaseDataForm = ({ initialValues, buttonLabel }: Props) => (
  <div className="formgrid">
    <Formik
      initialValues={initialValues}
      enableReinitialize
      onSubmit={console.log}
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
                  <InputTextApp
                    label="Materia*"
                    id="subject"
                    name="subject"
                    className="w-full"
                    icon="pi pi-pencil"
                  />
                </div>
                <div className="flex flex-column">
                  <Button
                    type="submit"
                    label={buttonLabel}
                    className="mt-2 flex align-items-center justify-content-center"
                    // loading={isLoadingUpdate || isLoadingCreate}
                    disabled={!isValid || isSubmitting || !dirty}
                  />
                </div>
              </Form>
            )
        }
    </Formik>
  </div>
);

export default PhaseDataForm;
