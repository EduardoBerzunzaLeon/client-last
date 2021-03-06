import { useContext, useState } from 'react';

import { Column } from 'primereact/column';
import { DataTable } from 'primereact/datatable';
import { Dialog } from 'primereact/dialog';
import { skipToken } from '@reduxjs/toolkit/dist/query';

import { ActionsBodyTemplate, NameHistoryBodyTemplate } from './columns';
import { ProfessorHistoryDataForm } from './ProfessorHistoryDataForm';
import { ProfessorInHistory } from '../../../../interfaces';
import { ProfessorsHistoryContext } from './context/professorsHistoryContext';
import { SpinnerRTK } from '../../../ui';
import { StudentContext } from '../../context/studentContext';

import { useGetProfessorsHistoryQuery } from '../../../../redux/student/student.api';
import { useModalLoading } from '../../../../hooks';

const createdAtBody = ({ createdAt }: ProfessorInHistory) => `${createdAt}`.slice(0, 10);
const dischargeAtBody = ({ dischargeAt }: ProfessorInHistory) => (dischargeAt ? `${dischargeAt}`.slice(0, 10) : '');

const { Provider } = ProfessorsHistoryContext;

export const ProfessorsHistoryDialog = () => {
  const {
    studentSelected,
    displayProfessorsHistoryModal,
    setStudentSelected,
    setDisplayProfessorsHistoryModal,
  } = useContext(StudentContext);

  const [ professorSelected, setProfessorSelected ] = useState<ProfessorInHistory>();

  const {
    data, isError, error, isFetching,
  } = useGetProfessorsHistoryQuery(studentSelected?.id ?? skipToken);

  const { isLoading } = useModalLoading({
    isFetching,
    hasData: !!data,
    hasEntitySelected: !!studentSelected,
  });

  return (
    <Provider value={{
      professorSelected,
      setProfessorSelected,
    }}
    >
      <Dialog
        header="Historial de Tutores"
        className="shadow-5 w-11"
        modal
        visible={displayProfessorsHistoryModal}
        onHide={() => {
          setStudentSelected(undefined);
          setDisplayProfessorsHistoryModal(false);
          setProfessorSelected(undefined);
        }}
      >
        <SpinnerRTK
          data={data}
          error={error}
          isError={isError}
          isLoading={isFetching && isLoading}
          messageError="No se encontraron tutores"
          messageLoading="Cargando Tutores"
          classNameSpinner="flex flex-column align-items-center justify-content-center"
        >

          {({ data: dataSend }) => (
            <div className="grid">
              <div className="col-12 md:col-4 ">
                <ProfessorHistoryDataForm lastProfessor={dataSend.professorsHistory.slice(-1)[0]} />
              </div>
              <div className="col-12 md:col-8 ">
                <DataTable
                  value={dataSend.professorsHistory}
                  responsiveLayout="scroll"
                  dataKey="id"
                  loading={isFetching}
                  emptyMessage="No se encontraron Tutores"
                >
                  <Column
                    field="professor.name.first"
                    header="Nombre"
                    body={NameHistoryBodyTemplate}
                  />
                  <Column
                    field="createdAt"
                    header="Creado el"
                    body={createdAtBody}
                  />
                  <Column
                    field="dischargeAt"
                    header="Baja el"
                    body={dischargeAtBody}
                  />
                  <Column
                    field="comments"
                    header="Comentario de baja"
                  />

                  <Column
                    body={ActionsBodyTemplate}
                    exportable={false}
                    style={{ minWidth: '8rem' }}
                  />
                </DataTable>
              </div>
            </div>
          )}
        </SpinnerRTK>
      </Dialog>
    </Provider>
  );
};

export default ProfessorsHistoryDialog;
