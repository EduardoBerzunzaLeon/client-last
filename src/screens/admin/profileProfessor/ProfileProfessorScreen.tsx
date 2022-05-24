import { useParams } from 'react-router-dom';
import { skipToken } from '@reduxjs/toolkit/dist/query';
import { Card } from 'primereact/card';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { FilterMatchMode } from 'primereact/api';
import { HeaderAdmin } from '../../../components/headerAdmin/HeaderAdmin';
import { useGetProfessorQuery } from '../../../redux/professor/professor.api';
import { SpinnerRTK } from '../../../components/spinnerRTK/SpinnerRTK';
import { SkeletonImage, Skeleton } from '../../../components/skeleton';
import { Divider } from '../../../components/divider/Divider';
import { Badge } from '../../../components/badge/Badge';
import { SubjectsList } from '../subjects/components/SubjectsList';
import { ImpartedAtBodyTemplate } from '../professors/components/columns/ActionsCourses';

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
              <Card title="Cursos">
                <DataTable
                  value={dataSend.courses}
                  responsiveLayout="scroll"
                  paginator
                  sortMode="multiple"
                  rows={5}
                  filters={{
                    name: { value: null, matchMode: FilterMatchMode.CONTAINS },
                    impartedAt: { value: null, matchMode: FilterMatchMode.CONTAINS },
                  }}
                  filterDisplay="row"
                  emptyMessage="No se encontraron cursos"
                >
                  <Column
                    field="name"
                    header="Curso"
                    sortable
                    filter
                    showFilterMenu={false}
                    filterPlaceholder="Buscar por nombre"
                  />
                  <Column
                    field="impartedAt"
                    header="Impartido el"
                    body={ImpartedAtBodyTemplate}
                    sortable
                    filter
                    showFilterMenu={false}
                    filterPlaceholder="Buscar por Fecha"
                  />
                </DataTable>
              </Card>
            </div>

          </div>
        )
      }
      </SpinnerRTK>
    </>
  );
};

export default ProfileProfessorScreen;
