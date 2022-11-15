import { useParams } from 'react-router-dom';

import { skipToken } from '@reduxjs/toolkit/dist/query';

import { SpinnerRTK, HeaderAdmin } from '../../../components/ui';
import { useGetAcademicCareerQuery } from '../../../redux/academicCareer/academicCareer.api';
import {
  AcademicCareerTree, StudentCard, UserCreatorCard, UnaddedSubjects,
} from '../../../components/academicCareer';

export const AcademicCareerScreen = () => {
  const { userId } = useParams();

  const {
    data, isError, error, isLoading,
  } = useGetAcademicCareerQuery(userId ?? skipToken);

  return (
    <SpinnerRTK
      data={data}
      error={error}
      isError={isError}
      isLoading={isLoading}
    >
      {({ data: dataSend }) => (
        <>
          <HeaderAdmin
            position="students/academicCareer"
            title={`Trayectoria Academica de ${dataSend.name.first} ${dataSend.name.last}`}
            hasBreadcumbs
          />
          <div className="grid">
            <div className={`col-12 ${dataSend.academicCareer && 'md:col-6'}`}>
              <StudentCard
                name={dataSend.name}
                email={dataSend.email}
                gender={dataSend.gender}
                avatar={dataSend.avatar}
                currentSemester={dataSend.currentSemester}
                enrollment={dataSend.enrollment}
              />
            </div>
            <div className="col-12 md:col-6">
              { dataSend.academicCareer && (
                <UserCreatorCard
                  {...dataSend.academicCareer.creatorUser}
                  period={dataSend.academicCareer.schoolYear.id.period}
                  phase={dataSend.academicCareer.schoolYear.phase}
                />
              )}
            </div>
          </div>
          <AcademicCareerTree
            academicCareer={dataSend.academicCareer}
            userId={userId || ''}
          />
          { dataSend.unaddedSubjects.length > 0 && (
            <UnaddedSubjects subjects={dataSend.unaddedSubjects} />
          )}
        </>
      )}
    </SpinnerRTK>
  );
};

export default AcademicCareerScreen;
