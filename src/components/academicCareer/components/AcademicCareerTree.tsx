import { useContext } from 'react';

import { Button } from 'primereact/button';
import { Message } from 'primereact/message';
import { Tree, TreeDragDropParams } from 'primereact/tree';

import { AcademicCareer } from '../../../interfaces/api/responses/academicCareerResponse';
import { Node } from './Node';
import { useGenerateAcademicCareerMutation, useUpdateAcademicCareerMutation } from '../../../redux/academicCareer/academicCareer.api';
import { ToastContext } from '../../../context';
import { processError } from '../../../utils';
import { ExcelButtonCareer } from './ExcelButtonCareer';

interface Props {
    userId: string,
    academicCareer: AcademicCareer | undefined,
}

export const AcademicCareerTree = ({ academicCareer, userId }: Props) => {
  const { showSuccess, showError } = useContext(ToastContext);
  const [ generate, { isLoading: isLoadingGenerate }] = useGenerateAcademicCareerMutation();
  const [ update, { isLoading: isLoadingUpdate }] = useUpdateAcademicCareerMutation();

  const onGenerate = async () => {
    try {
      const data = {
        userId,
        subjectsInSemester: 100,
        canAdvanceSubject: true,
        hasValidation: true,
      };
      await generate(data).unwrap();
      showSuccess({ detail: 'La trayectoria academica se genero con éxito' });
    } catch (error) {
      processError({ error, showError });
    }
  };

  const onDragDrop = async (event: TreeDragDropParams) => {
    const { dragNode, dropNode } = event;
    if (
      dragNode.data.draggable
      && dropNode?.data.droppable
    ) {
      try {
        const data = {
          userId,
          subjectId: dragNode.key?.toString() || '',
          newSemester: dropNode.key?.toString() || '',
          subjectsInSemester: 100,
          canAdvanceSubject: true,
          hasValidation: true,
        };
        await update(data).unwrap();
        return showSuccess({ detail: 'La trayectoria academica se generó con éxito' });
      } catch (error) {
        return processError({ error, showError });
      }
    }
    return showError({ detail: 'No se puede cambiar la materia, favor de verificar su movimiento' });
  };

  return (
    <div className="card">
      <div className="col-12">
        <Button
          type="button"
          icon="pi pi-sitemap"
          label="Generar Trayectoria Academica"
          className="p-button-outlined m-2"
          onClick={onGenerate}
        />
        {
        academicCareer ? (
          <>
            <ExcelButtonCareer userId={userId} />
            <Tree
              value={academicCareer?.subjects}
              nodeTemplate={Node}
              filter
              filterBy="data.name,data.atRisk"
              dragdropScope="demo"
              loading={isLoadingGenerate || isLoadingUpdate}
              onDragDrop={onDragDrop}
            />
          </>
        ) : (<Message severity="warn" text="Aun no se ha generado la trayectoria academica" className="mt-3 p-4 font-bold block" />)
      }
      </div>
    </div>
  );
};

export default AcademicCareerTree;
