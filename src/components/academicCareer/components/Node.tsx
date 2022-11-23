import { Chip } from 'primereact/chip';
// eslint-disable-next-line import/no-unresolved
import TreeNode from 'primereact/treenode';
import { Badge as PrimeBadge } from 'primereact/badge';
import { Tooltip } from 'primereact/tooltip';

import { ucWords } from '../../../utils';
import { Badge, Status } from '../../ui';

const matchObject: Record<string, Status> = {
  aprobado: 'success',
  porcursar: 'warning',
  reprobado: 'danger',
  cursando: 'info',
};

export const Node = (node: TreeNode) => {
  const { data } = node;
  if (!Array.isArray(data.phase)) {
    return (<span>{data.name}</span>);
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
                <div key={`${phase.phaseStatus}${phase.semester}${phase.mode}`} className="mr-2">
                  <Badge
                    className="mr-2"
                    text={`${phase.phaseStatus} - Semestre ${phase.semester}`}
                    matchObject={matchObject}
                    match={phaseStatusCleaned}
                  />
                  <Tooltip target={`.${phase.mode}`} content={ucWords(phase.mode)} position="top" />
                  <PrimeBadge
                    value={phase.mode?.slice(0, 1).toUpperCase()}
                    severity={matchObject[phaseStatusCleaned] ?? 'info'}
                    className={phase.mode}
                  />
                </div>
              );
            })
          }

      </div>

    </div>

  );
};

export default Node;
