import { useRef } from 'react';
import {
  CurrentSubjectsForm, FailedSubjectsForm, FileErrors, PhaseCard, StepsDemo, ValidationPasswordForm,
} from '../../../components/schoolYear';
import { HeaderAdmin, SpinnerRTK } from '../../../components/ui';

import { useGetSchoolYearQuery } from '../../../redux/schoolYear/schoolYear.api';

export const SchoolYearScreen = () => {
  const failedSubjectFile = useRef<any>(null);
  const currentSubjectFile = useRef<any>(null);
  const passwordInput = useRef<any>(null);

  const {
    data, isError, error, isLoading,
  } = useGetSchoolYearQuery();

  const contextValues = {
    failedSubjectFile,
    currentSubjectFile,
    passwordInput,
  };

  const items = [
    {
      label: 'Materias Reprobadas',
      children: <FailedSubjectsForm />,
    },
    {
      label: 'Materias Nuevas',
      children: <CurrentSubjectsForm />,
    },
    {
      label: 'Validación',
      children: <ValidationPasswordForm />,
      nextButton: () => {
        console.log('Last Button');
      },
      nextButtonLabel: 'Actualizar',
    },
  ];

  return (
    <SpinnerRTK
      error={error}
      data={data}
      isLoading={isLoading}
      isError={isError}
    >
      {({ data: dataSend }) => (
        <>
          <HeaderAdmin
            position="schoolYear"
            title={`Ciclo Escolar ${dataSend.period.start} - ${dataSend.period.end}`}
            hasBreadcumbs
          />
          <div className="grid">
            <div className="col-12 md:col-6">
              <PhaseCard {...dataSend.firstPhase} title="Primera Fase" />
            </div>
            <div className="col-12 md:col-6">
              <PhaseCard {...dataSend.secondPhase} title="Segunda Fase" />
            </div>
            <div className="col-12 md:col-6">
              <FileErrors
                {...dataSend.period}
                status="no generado"
                endpointName="currentSubjects"
                title="Error en el archivo de Materias Nuevas"
              />
            </div>
            <div className="col-12 md:col-6">
              <FileErrors
                {...dataSend.period}
                status="no generado"
                endpointName="failedSubjects"
                title="Error en el archivo de Materias Reprobadas"
              />
            </div>

            <div className="col-12">
              <StepsDemo
                contextValues={contextValues}
                initAdvanceValue={false}
                items={items}
              />
            </div>
          </div>
        </>

      )}
    </SpinnerRTK>
  );
};

export default SchoolYearScreen;
