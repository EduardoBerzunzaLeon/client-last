import { useContext } from 'react';

import { Dialog } from 'primereact/dialog';
import { Form, Formik } from 'formik';
import * as Yup from 'yup';

import { Button } from 'primereact/button';
import { Dropdown } from 'primereact/dropdown';
import { FormElement, InputTextApp } from '../../forms';
import { SubjectHistoryContext } from '../context/subjectHistoryContext';

const phasesStatus = [
  { name: 'cursando', code: 'cursando' },
  { name: 'aprobado', code: 'aprobado' },
  { name: 'reprobado', code: 'reprobado' },
];

export const PhaseDialog = () => {
  const {
    displayModal, phaseOfSubjectSelected, setDisplayModal, setPhaseOfSubjectSelected,
  } = useContext(SubjectHistoryContext);

  console.log(phaseOfSubjectSelected);

  //   const [ initialPhase ] = useState({
  //     phaseStatus: phaseOfSubjectSelected?.lastPhase.phaseStatus ?? '',
  //     semester: phaseOfSubjectSelected?.lastPhase.semester ?? '',
  //   });

  return (
    <Dialog
      header="Editar Fase de la materia"
      className="shadow-5 w-11 md:w-6 lg:w-5"
      modal
      blockScroll
      visible={displayModal}
      onHide={() => {
        setPhaseOfSubjectSelected(undefined);
        setDisplayModal(false);
      }}
    >
      <div className="formgrid">
        <Formik
          initialValues={{
            phaseStatus: {
              name: phaseOfSubjectSelected?.lastPhase.phaseStatus ?? '',
              code: phaseOfSubjectSelected?.lastPhase.phaseStatus.toLowerCase() ?? '',
            },
            semester: phaseOfSubjectSelected?.lastPhase.semester ?? 1,
          }}
          enableReinitialize
          onSubmit={console.log}
          validationSchema={Yup.object({
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
                      />
                    </div>
                    <div className="flex flex-column">
                      <Button
                        type="submit"
                        label="Editar Fase"
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
    </Dialog>
  );
};

export default PhaseDialog;
