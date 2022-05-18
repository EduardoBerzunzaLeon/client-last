import { useContext } from 'react';

import { Dialog } from 'primereact/dialog';
import { skipToken } from '@reduxjs/toolkit/dist/query';

import { SubjectContext } from '../context/subjectContext';
import { useGetSubjectQuery } from '../../../../redux/subject/subject.api';
import { SpinnerRTK } from '../../../../components/spinnerRTK/SpinnerRTK';
import { Badge } from '../../../../components/badge/Badge';
import { SpanDetail } from '../../../../components/spanDetail/SpanDetail';
import { SubjectsList } from './SubjectsList';

export const SubjectDialog = () => {
  const {
    subjectSelected, isOpenDetailModal, setSubjectSelected, setIsOpenDetailModal,
  } = useContext(SubjectContext);

  const {
    data, isError, error, isFetching,
  } = useGetSubjectQuery(subjectSelected?.id ?? skipToken);

  return (
    <Dialog
      header="Detalle de la Materia"
      className="shadow-5 w-11 md:w-7 text-purple-700"
      modal
      visible={isOpenDetailModal}
      onHide={() => {
        setSubjectSelected(undefined);
        setIsOpenDetailModal(false);
      }}
    >

      <SpinnerRTK
        data={data}
        error={error}
        isError={isError}
        isLoading={isFetching}
        messageError="No se encontró la materia"
        messageLoading="Cargando Materia"
        classNameSpinner="flex flex-column align-items-center justify-content-center"
      >
        {({ data: dataSend }) => (
          <div className="grid">
            <div className="col-12 text-lg">

              <div className="flex flex-row mb-3">
                <SpanDetail
                  title="Nombre:"
                  icon="book"
                  value={dataSend.name}
                />

                <Badge
                  className="ml-2"
                  text={dataSend.deprecated ? 'Deprecado' : 'Activo'}
                  matchObject={{
                    true: 'danger',
                    false: 'success',
                  }}
                  match={dataSend.deprecated.toString()}
                />

              </div>

              {
                    dataSend.deprecated && (
                    <div className="flex flex-row mb-3">
                      <SpanDetail
                        title="Deprecado el:"
                        icon="clock"
                        value={dataSend?.deprecatedAt?.toString() ?? ''}
                      />
                    </div>
                    )
                }

              <div className="formgrid grid">
                <div className="field col">
                  <SpanDetail
                    title="Semestre:"
                    icon="briefcase"
                    value={dataSend.semester.toString()}
                  />
                </div>
                <div className="field col">
                  <SpanDetail
                    title="Créditos:"
                    icon="briefcase"
                    value={dataSend.credit.toString()}
                  />
                </div>
              </div>

              <div className="formgrid grid">
                <div className="field col">
                  <SpanDetail
                    title="Horas Prácticas:"
                    icon="clock"
                    value={dataSend.practicalHours.toString()}
                  />
                </div>
                <div className="field col">
                  <SpanDetail
                    title="Horas Teóricas:"
                    icon="clock"
                    value={dataSend.theoreticalHours.toString()}
                  />
                </div>
              </div>

              <SpanDetail
                title="Creado el:"
                icon="clock"
                value={dataSend.createdAt.toString()}
              />

              {(
                dataSend?.requiredSubjects
                  && dataSend?.requiredSubjects?.length > 0
              ) && (
                <SubjectsList
                  subjects={dataSend.requiredSubjects}
                  title="Materias Requeridas"
                />
              )}

              {(
                dataSend?.correlativeSubjects
                  && dataSend?.correlativeSubjects?.length > 0
              ) && (
                <SubjectsList
                  subjects={dataSend.correlativeSubjects}
                  title="Materias Correlativas"
                />
              )}

            </div>
          </div>
        )}

      </SpinnerRTK>

    </Dialog>
  );
};

export default SubjectDialog;
