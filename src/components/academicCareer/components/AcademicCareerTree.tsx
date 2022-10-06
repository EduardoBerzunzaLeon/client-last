import { useState, useEffect } from 'react';

import { Button } from 'primereact/button';
import { Chip } from 'primereact/chip';
import { Message } from 'primereact/message';
import { Tree } from 'primereact/tree';
// eslint-disable-next-line import/no-unresolved
import TreeNode from 'primereact/treenode';

import { AcademicCareer } from '../../../interfaces/api/responses/academicCareerResponse';
import { Badge } from '../../ui';
import { ucWords } from '../../../utils';

interface Props {
    academicCareer: AcademicCareer | undefined;
}

const AcademicCareerTree = ({ academicCareer }: Props) => {
  const [ nodes, setNodes ] = useState<any>(null);

  useEffect(() => {
    setNodes(academicCareer?.subjects || null);
  }, [ academicCareer ]);

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
    <div className="card">
      <div className="col-12">
        <Button
          type="button"
          icon="pi pi-sitemap"
          label="Generar Trayectoria Academica"
          className="p-button-outlined m-2 mb-3"
        />
        {
        academicCareer ? (
          <>
            <Button
              type="button"
              icon="pi pi-file-excel"
              label="Descargar Trayectoria en Excel"
              className="p-button p-button-success m-2 mb-3"
            />
            <Tree
              value={nodes ?? academicCareer?.subjects}
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
          </>
        ) : (<Message severity="warn" text="Aun no se ha generado la trayectoria academica" className="mt-3 p-4 font-bold block" />)
      }
      </div>
    </div>
  );
};

export default AcademicCareerTree;
