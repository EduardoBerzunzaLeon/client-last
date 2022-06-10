import {
  useContext,
} from 'react';

import { Dialog } from 'primereact/dialog';
import { skipToken } from '@reduxjs/toolkit/dist/query';
import { TabPanel, TabView } from 'primereact/tabview';

import { CorrelativeSubjectForm } from './CorrelativeSubjectForm';
import { SingleResponse } from '../../../../interfaces/api/responses/genericInterface';
import { SpinnerRTK } from '../../../../components/spinnerRTK/SpinnerRTK';
import { SubjectContext } from '../context/subjectContext';
import { SubjectDataForm } from './SubjectDataForm';
import { SubjectDetail } from '../../../../interfaces/api/responses/subjectInterface';

import { useGetSubjectQuery } from '../../../../redux/subject/subject.api';
import { useTitle } from '../../../../hooks/useTitle';
import { useModalLoading } from '../../../../hooks/useModalLoading';

const emptyData: SingleResponse<SubjectDetail> = {
  status: 'success',
  data: {
    id: '',
    credit: 1,
    createdAt: new Date(),
    deprecated: false,
    name: '',
    semester: 1,
    core: 'Básico',
    practicalHours: 0,
    theoreticalHours: 0,
  },
};

export const SubjectDialog = () => {
  const {
    subjectSelected, displayModal, setSubjectSelected, setDisplayModal,
  } = useContext(SubjectContext);

  const {
    data, isError, error, isFetching,
  } = useGetSubjectQuery(subjectSelected?.id ?? skipToken);

  const { title } = useTitle({
    createTitle: 'Crear Materia',
    updateTitle: 'Editar Materia',
    displayModal,
    hasEntitySelected: !!subjectSelected,
  });

  const { isLoading } = useModalLoading({
    isFetching,
    hasData: !!data,
    hasEntitySelected: !!subjectSelected,
  });

  const onHide = () => {
    setSubjectSelected(undefined);
    setDisplayModal(false);
  };

  return (
    <Dialog
      header={title}
      className="shadow-5 w-11 md:w-6 lg:w-5"
      modal
      visible={displayModal}
      onHide={onHide}
    >
      <SpinnerRTK
        data={subjectSelected?.id ? data : emptyData}
        error={error}
        isError={isError}
        isLoading={isFetching && isLoading}
        messageError="No se encontró la materia"
        messageLoading="Cargando Materia"
        classNameSpinner="flex flex-column align-items-center justify-content-center"
      >
        {({ data: dataSend }) => (
          <TabView>
            <TabPanel header="Información Básica">
              <SubjectDataForm subject={dataSend} buttonLabel={title} />
            </TabPanel>
            {
            dataSend?.id && (
              <TabPanel header="Agregar Materia Obligatoria">
                <CorrelativeSubjectForm
                  id={dataSend.id}
                  semester={dataSend.semester}
                  correlativeSubjects={dataSend.correlativeSubjects ?? []}
                />
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
