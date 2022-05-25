import { Card } from 'primereact/card';
import { skipToken } from '@reduxjs/toolkit/dist/query';
import { useParams } from 'react-router-dom';

import { Badge } from '../../../components/badge/Badge';
import { Divider } from '../../../components/divider/Divider';
import { HeaderAdmin } from '../../../components/headerAdmin/HeaderAdmin';
import { SkeletonImage, Skeleton } from '../../../components/skeleton';
import { SpinnerRTK } from '../../../components/spinnerRTK/SpinnerRTK';
import { SubjectsList } from '../../../components/subject/SubjectsList';

import { useGetProfessorQuery } from '../../../redux/professor/professor.api';
import CoursesTable from './components/CoursesTable';

export const ProfileProfessorScreen = () => {
  const { id } = useParams();

  const {
    data, isError, error, isLoading,
  } = useGetProfessorQuery(id ?? skipToken);

  return (
    <>
      <HeaderAdmin position="professors/professor" title="Perfil del Tutor" />
      <SpinnerRTK
        data={data}
        error={error}
        isError={isError}
        isLoading={isLoading}
      >
        {
        ({ data: dataSend }) => (
          <div className="grid">

            <div className="col-12 md:col-4">
              <Card title="Perfil">
                <div className="flex justify-content-center">
                  <Skeleton
                    className="border-circle w-8rem h-8rem"
                  >
                    <SkeletonImage
                      src={dataSend?.avatar}
                      alt="Profile"
                      className="border-circle border-purple-700 border-3 w-8rem h-8rem"
                      referrerPolicy="no-referrer"
                    />
                  </Skeleton>
                </div>

                <div className="overflow-hidden text-overflow-ellipsis">
                  <Divider text="Nombre" icon="user" />
                  <span className="font-semibold">{dataSend.fullname}</span>
                </div>

                <div className="overflow-hidden text-overflow-ellipsis">
                  <Divider text="Correo" icon="envelope" />
                  <span className="font-semibold">{dataSend.email}</span>
                </div>

                <div className="overflow-hidden text-overflow-ellipsis">
                  <Divider text="Sexo" icon="question" />
                  <span className="font-semibold">{dataSend.gender === 'M' ? 'Hombre' : 'Mujer'}</span>
                </div>

                <div className="overflow-hidden text-overflow-ellipsis py-1">
                  <Divider text="Activo" icon="key" />
                  <Badge
                    text={dataSend?.active ? 'Activo' : 'Inactivo'}
                    matchObject={{
                      true: 'success',
                      false: 'danger',
                    }}
                    match={dataSend.active.toString()}
                  />
                </div>

              </Card>
            </div>

            <div className="col-12 md:col-4">
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

            <div className="col-12 md:col-4">
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
