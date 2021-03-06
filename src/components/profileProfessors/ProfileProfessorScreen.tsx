import { Card } from 'primereact/card';
import { skipToken } from '@reduxjs/toolkit/dist/query';
import { useParams } from 'react-router-dom';

import { CoursesTable } from './components/CoursesTable';
import { SubjectsList } from '../subjects/components/SubjectsList';

import { HeaderAdmin, SpinnerRTK } from '../ui';
import { useGetProfessorQuery } from '../../redux/professor/professor.api';

export const ProfileProfessorScreen = () => {
  const { id } = useParams();

  const {
    data, isError, error, isLoading,
  } = useGetProfessorQuery(id ?? skipToken);

  return (
    <>
      <HeaderAdmin position="users/profile" title="Información como profesor" hasBreadcumbs={false} />
      <SpinnerRTK
        data={data}
        error={error}
        isError={isError}
        isLoading={isLoading}
      >
        {
        ({ data: dataSend }) => (
          <div className="grid">

            <div className="col-12 md:col-6">
              <Card title="Materias">
                {
                  (dataSend.subjects) && (
                  <SubjectsList
                    subjects={dataSend.subjects}
                    title="Materias Impartidas"
                  />
                  )

                }
              </Card>
            </div>

            <div className="col-12 md:col-6">
              <CoursesTable courses={dataSend.courses} />
            </div>

          </div>
        )
      }
      </SpinnerRTK>
    </>
  );
};

export default ProfileProfessorScreen;
