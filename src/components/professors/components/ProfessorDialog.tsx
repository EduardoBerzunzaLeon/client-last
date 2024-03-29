import { useContext } from 'react';

import { Dialog } from 'primereact/dialog';
import { skipToken } from '@reduxjs/toolkit/dist/query';
import { TabPanel, TabView } from 'primereact/tabview';

import { ProfessorContext } from '../context/professorContext';
import { ProfessorDataForm } from './ProfessorDataForm';
import { SingleResponse, ProfessorDetail } from '../../../interfaces';
import { SpinnerRTK } from '../../ui';

import { useGetProfessorQuery } from '../../../redux/professor/professor.api';
import { useTitle, useModalLoading } from '../../../hooks';

const emptyData: SingleResponse<ProfessorDetail> = {
  status: 'success',
  data: {
    id: '',
    createdAt: new Date(),
    name: {
      first: '',
      last: '',
    },
    gender: 'M',
    fullname: '',
    email: '',
    active: true,
    subjects: [],
    courses: [],
  },
};

export const ProfessorDialog = () => {
  const {
    professorSelected, displayModal, setProfessorSelected, setDisplayModal,
  } = useContext(ProfessorContext);

  const {
    data, isError, error, isFetching,
  } = useGetProfessorQuery(professorSelected?.id ?? skipToken);

  const { title } = useTitle({
    createTitle: 'Crear Tutor',
    updateTitle: 'Editar Tutor',
    displayModal,
    hasEntitySelected: !!professorSelected,
  });

  const { isLoading } = useModalLoading({
    isFetching,
    hasData: !!data,
    hasEntitySelected: !!professorSelected,
  });

  return (
    <Dialog
      header={title}
      className="shadow-5 w-11 md:w-6 lg:w-5"
      modal
      visible={displayModal}
      onHide={() => {
        setProfessorSelected(undefined);
        setDisplayModal(false);
      }}
    >
      <SpinnerRTK
        data={professorSelected?.id ? data : emptyData}
        error={error}
        isError={isError}
        isLoading={isFetching && isLoading}
        messageError="No se encontró el tutor"
        messageLoading="Cargando Tutor"
        classNameSpinner="flex flex-column align-items-center justify-content-center"
      >

        {({ data: dataSend }) => (
          <TabView>
            <TabPanel header="Datos Personales">
              <ProfessorDataForm professor={dataSend} buttonLabel={title} />
            </TabPanel>
          </TabView>
        )}
      </SpinnerRTK>

    </Dialog>
  );
};

export default ProfessorDialog;
