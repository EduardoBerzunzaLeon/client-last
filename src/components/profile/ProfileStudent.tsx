import { useParams } from 'react-router-dom';
import { skipToken } from '@reduxjs/toolkit/dist/query';

import { CurrentSubjects, SubjectsStudied } from '../subjectHistory';
import { HeaderAdmin, SpinnerRTK } from '../ui';

import { useGetStudentSubjectQuery } from '../../redux/subjectHistory/subjectHistory.api';

export const ProfileStudent = () => {
  const { id } = useParams();

  const {
    data, isError, error, isLoading,
  } = useGetStudentSubjectQuery(id ?? skipToken);

  return (
    <>
      <HeaderAdmin position="users/profile" title="Información como alumno" hasBreadcumbs={false} />
      <SpinnerRTK
        data={data}
        error={error}
        isError={isError}
        isLoading={isLoading}
      >
        {({ data: dataSend }) => (
          <div className="grid">
            <div className="col-12 md:col-6">
              <CurrentSubjects
                currentSubjects={dataSend.subjectHistory}
                title="Materias del semestre actual"
              />
            </div>
            <div className="col-12 md:col-6">
              <SubjectsStudied userId={dataSend.user._id} />
            </div>
          </div>
        )}

      </SpinnerRTK>
    </>
  );
};

export default ProfileStudent;
