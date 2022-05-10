import { useContext } from 'react';

import { Dialog } from 'primereact/dialog';
import { TabPanel, TabView } from 'primereact/tabview';

import { SubjectContext } from '../context/subjectContext';
import { SubjectDataForm } from './SubjectDataForm';
import { useGetSubjectQuery } from '../../../../redux/subject/subject.api';
import { SpinnerRTK } from '../../../../components/spinnerRTK/SpinnerRTK';

export const SubjectDialog = () => {
  const {
    subjectSelected, displayModal, setSubjectSelected, setDisplayModal,
  } = useContext(SubjectContext);

  const {
    data, isError, error, isLoading,
  } = useGetSubjectQuery(subjectSelected?.id ?? '');

  return (
    <Dialog
      header={subjectSelected ? 'Editar Materia' : 'Crear Materia'}
      className="shadow-5 w-11 md:w-6 lg:w-5"
      modal
      visible={displayModal}
      onHide={() => {
        setSubjectSelected(undefined);
        setDisplayModal(false);
      }}
    >
      <SpinnerRTK
        data={data}
        error={error}
        isError={isError}
        isLoading={isLoading}
        messageError="No se encontró la materia"
        messageLoading="Cargando Materia"
        classNameSpinner="flex flex-column align-items-center justify-content-center"
      >
        {({ data: dataSend }) => (
          <TabView>
            <TabPanel header="Información Básica">
              <SubjectDataForm subjectId={dataSend?.id} />
            </TabPanel>
            {
            subjectSelected && (
            <TabPanel header="Agregar Materia Obligatoria">
                {/* <AdminPasswordForm userId={subjectSelected.id} /> */}
            </TabPanel>
            )
            }

          </TabView>
        )}

      </SpinnerRTK>

    </Dialog>
  );
};

export default SubjectDialog;
