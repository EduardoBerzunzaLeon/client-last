import { useParams } from 'react-router-dom';

import { skipToken } from '@reduxjs/toolkit/dist/query';
import { Tree } from 'primereact/tree';
// eslint-disable-next-line import/no-unresolved
import TreeNode from 'primereact/treenode';

import { SpinnerRTK, HeaderAdmin } from '../../../components/ui';
import { useGetAcademicCareerQuery } from '../../../redux/academicCareer/academicCareer.api';

export const AcademicCareerScreen = () => {
  const { userId } = useParams();

  const {
    data, isError, error, isLoading,
  } = useGetAcademicCareerQuery(userId ?? skipToken);

  const nodeTemplate = (node: TreeNode) => {
    if (!Array.isArray(node.data.phase)) {
      return (
        <span>
          {node.data.name}
        </span>
      );
    }

    return (
      <span>
        {node.data.name}
        {
          node.data.phase.map((phase: any) => (
            <h2>
              {phase.phaseStatus}
              {' '}
              -
              {' '}
              {phase.semester}
            </h2>
          ))
        }
      </span>

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
          <div className="grid mb-4">
            <div className="col-12">
              <Tree
                value={dataSend.adjustedSubjects}
                nodeTemplate={nodeTemplate}
              />
            </div>
          </div>
        </>
      )}
    </SpinnerRTK>
  );
};

export default AcademicCareerScreen;
