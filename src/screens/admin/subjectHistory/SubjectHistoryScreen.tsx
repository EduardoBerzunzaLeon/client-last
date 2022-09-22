import { useState } from 'react';
import { useParams } from 'react-router-dom';

import { skipToken } from '@reduxjs/toolkit/dist/query';

import {
  CurrentSubjects,
  PhaseDialog,
  SubjectHistoryContext,
  SubjectsStudied,
  UnstudySubjects,
} from '../../../components/subjectHistory';
import { HeaderAdmin, SpinnerRTK } from '../../../components/ui';
import { SubjectHistory } from '../../../interfaces';

import { useGetStudentSubjectQuery } from '../../../redux/subjectHistory/subjectHistory.api';

const { Provider } = SubjectHistoryContext;

export const SubjectHistoryScreen = () => {
  const { userId } = useParams();
  const [ phaseOfSubjectSelected, setPhaseOfSubjectSelected ] = useState<SubjectHistory>();
  const [ displayModal, setDisplayModal ] = useState(false);

  const {
    data, isError, error, isLoading,
  } = useGetStudentSubjectQuery(userId ?? skipToken);

  return (
    <SpinnerRTK
      data={data}
      error={error}
      isError={isError}
      isLoading={isLoading}
    >
      {({ data: dataSend }) => (
        <Provider value={{
          displayModal,
          phaseOfSubjectSelected,
          setDisplayModal,
          setPhaseOfSubjectSelected,
          user: {
            id: dataSend.user._id,
            semester: dataSend.currentSemester,
          },
        }}
        >
          <HeaderAdmin
            position="students/subjectHistory"
            title={`Historial de ${dataSend.user.fullName}`}
            hasBreadcumbs
          />
          <div className="grid mb-4">
            <div className="col-12">
              <CurrentSubjects
                currentSubjects={dataSend.subjectHistory}
                isEditable
              />
            </div>
            <div className="col-12 xl:col-6">
              <SubjectsStudied userId={dataSend.user._id} />
            </div>
            <div className="col-12 xl:col-6">
              <UnstudySubjects userId={dataSend.user._id} />
            </div>
          </div>
          <PhaseDialog />
        </Provider>
      )}
    </SpinnerRTK>
  );
};

export default SubjectHistoryScreen;
