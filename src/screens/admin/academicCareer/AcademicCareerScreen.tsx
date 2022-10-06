import { useParams } from 'react-router-dom';

import { skipToken } from '@reduxjs/toolkit/dist/query';

import { SpinnerRTK, HeaderAdmin } from '../../../components/ui';
import { useGetAcademicCareerQuery } from '../../../redux/academicCareer/academicCareer.api';
import { StudentCard, UserCreatorCard } from '../../../components/academicCareer';
import AcademicCareerTree from '../../../components/academicCareer/components/AcademicCareerTree';

export const AcademicCareerScreen = () => {
  const { userId } = useParams();
  // eslint-disable-next-line no-undef

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
                <UserCreatorCard {...dataSend.academicCareer.creatorUser} />
              )}
            </div>
          </div>
          <AcademicCareerTree academicCareer={dataSend.academicCareer} />
        </>
      )}
    </SpinnerRTK>
  );
};

export default AcademicCareerScreen;
