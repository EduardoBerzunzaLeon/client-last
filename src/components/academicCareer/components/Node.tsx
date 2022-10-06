import { Chip } from 'primereact/chip';
// eslint-disable-next-line import/no-unresolved
import TreeNode from 'primereact/treenode';

import { ucWords } from '../../../utils';
import { Badge } from '../../ui';

export const Node = (node: TreeNode) => {
  const { data } = node;
  if (!Array.isArray(data.phase)) {
    return (
      <span>
        {data.name}
      </span>
    );
  }

  return (
    <div className="flex justify-content-between flex-wrap w-full" draggable={false}>
      <span>{ucWords(data.name)}</span>
      <div className="flex align-items-center">

        { data.atRisk && (
          <Chip
            label={data.atRisk}
            className="mr-2"
            icon="pi pi-exclamation-triangle"
            style={{ backgroundColor: '#ffcc10', fontWeight: 'bolder' }}
          />
        )}

        {
            data.phase.map((phase: any) => {
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

export default Node;
