import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

import { skipToken } from '@reduxjs/toolkit/dist/query';
import { Tree } from 'primereact/tree';
// eslint-disable-next-line import/no-unresolved
import TreeNode from 'primereact/treenode';
import { Chip } from 'primereact/chip';

import { SpinnerRTK, HeaderAdmin, Badge } from '../../../components/ui';
import { useGetAcademicCareerQuery } from '../../../redux/academicCareer/academicCareer.api';
import { ucWords } from '../../../utils';
import { StudentCard, UserCreatorCard } from '../../../components/academicCareer';

export const AcademicCareerScreen = () => {
  const { userId } = useParams();
  // eslint-disable-next-line no-undef
  const [ nodes, setNodes ] = useState<any>(null);

  const {
    data, isError, error, isLoading,
  } = useGetAcademicCareerQuery(userId ?? skipToken);

  useEffect(() => {
    setNodes(data?.data?.academicCareer?.subjects || null);
  }, [ data ]);

  const nodeTemplate = (node: TreeNode) => {
    if (!Array.isArray(node.data.phase)) {
      return (
        <span>
          {node.data.name}
        </span>
      );
    }

    return (
      <div className="flex justify-content-between flex-wrap w-full" draggable={false}>
        <span>{ucWords(node.data.name)}</span>
        <div className="flex align-items-center">

          { node.data.atRisk && (
            <Chip
              label={node.data.atRisk}
              className="mr-2"
              icon="pi pi-exclamation-triangle"
              style={{ backgroundColor: '#ffcc10', fontWeight: 'bolder' }}
            />
          )}

          {
          node.data.phase.map((phase: any) => {
            const phaseStatusCleaned = phase.phaseStatus.replaceAll(' ', '').toLowerCase();
            return (
              <Badge
                key={`${phase.phaseStatus}${phase.semester}`}
                className="mr-2"
                text={`${phase.phaseStatus} - Semestre ${phase.semester}`}
                matchObject={{
                  aprobado: 'success',
                  porcursar: 'warning',
                  reprobado: 'danger',
                  cursando: 'info',
                }}
                match={phaseStatusCleaned}
              />
            );
          })
        }

        </div>

      </div>

    );
  };

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
            title="Trayectoria Academica de Name Test"
            hasBreadcumbs
          />
          {/* <div className="flex justify-content-between flex-wrap card-container">
          </div> */}
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
              {dataSend.academicCareer && (
                <UserCreatorCard {...dataSend.academicCareer.creatorUser} />
              )}
            </div>
          </div>

          <div className="grid mb-4">

            <div className="col-12">
              <Tree
                value={nodes ?? dataSend.academicCareer?.subjects}
                nodeTemplate={nodeTemplate}
                filter
                filterBy="data.name,data.atRisk"
                dragdropScope="demo"
                onDragDrop={(event) => {
                  if (
                    event.dragNode.data.draggable
                      && event.dropNode?.data.droppable
                  ) {
                    setNodes(event.value);
                  }
                }}
              />
            </div>
          </div>
        </>
      )}
    </SpinnerRTK>
  );
};

export default AcademicCareerScreen;
