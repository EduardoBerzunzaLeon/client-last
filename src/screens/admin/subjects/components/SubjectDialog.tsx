import { useContext } from 'react';

import { Dialog } from 'primereact/dialog';
import { skipToken } from '@reduxjs/toolkit/dist/query';
import { TabPanel, TabView } from 'primereact/tabview';

import { SubjectContext } from '../context/subjectContext';
import { SubjectDataForm } from './SubjectDataForm';
import { useGetSubjectQuery } from '../../../../redux/subject/subject.api';
import { SpinnerRTK } from '../../../../components/spinnerRTK/SpinnerRTK';
import { SingleResponse } from '../../../../interfaces/api/responses/genericInterface';
import { SubjectDetail } from '../../../../interfaces/api/responses/subjectInterface';

const emptyData: SingleResponse<SubjectDetail> = {
  status: 'success',
  data: {
    id: '',
    credit: 0,
    createAt: new Date(),
    deprecated: false,
    name: '',
    semester: 0,
  },
};

export const SubjectDialog = () => {
  const {
    subjectSelected, displayModal, setSubjectSelected, setDisplayModal,
  } = useContext(SubjectContext);

  const {
    data, isError, error, isFetching,
  } = useGetSubjectQuery(subjectSelected?.id ?? skipToken);

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
        data={subjectSelected?.id ? data : emptyData}
        error={error}
        isError={isError}
        isLoading={isFetching}
        messageError="No se encontró la materia"
        messageLoading="Cargando Materia"
        classNameSpinner="flex flex-column align-items-center justify-content-center"
      >
        {({ data: dataSend }) => (
          <TabView>
            <TabPanel header="Información Básica">
              <SubjectDataForm subject={dataSend} />
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
